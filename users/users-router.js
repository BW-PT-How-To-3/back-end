const express = require('express')
const db = require('./users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const secrets = require('./config/secrets')
const restrict = require('../middleware/restrict')
/*  USER ROUTER  */
const ur = express.Router()

//-----------------------------------------------------------------------------
//  GETs all user accounts. (You must be logged in with admin role)   
// /api/users/getusers  
//-----------------------------------------------------------------------------
ur.get('/getusers',  async (req, res, next) => {
   
  try {
       const users = await db.allUsers()
        res.status(200).json(users)
  }catch (err){
      next(err)
  }

})

//-----------------------------------------------------------------------------
// POST registers new user and return users info    
// /api/users/register  
//-----------------------------------------------------------------------------
ur.post('/register', async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const user = await db.findUser({ username }).first()

        if (user) {
            return res.status(400).json({
                Message: "Username is already being used. Please try another"
            })
        }
        const newUser = await db.addUser({
            username,
            password: await bcrypt.hash(password, 12),
            email,
            role: 1
        })
        return res.status(201).json({
            Message:" User was created successfully!",
            User: newUser
        })
    } catch (err) {
        next(err)
    }
})

//-----------------------------------------------------------------------------
// POST Logs in user and Returns a welcome message with username gives a token   
// /api/users/login 
//-----------------------------------------------------------------------------
ur.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await db.findUser({ username }).first()

        if (!user) {
            return res.status(401).json({ 
                Error: 'You have entered an incorrect username'
            })
        } 
        const passwordValid = await bcrypt.compare( password, user.password )
        if (!passwordValid) {
        return res.status(401).json({ 
            Error: 'You have entered an incorrect password'
        })
    }
    /*  generate token  */
    const token =  jwt.sign({
        userID: user.id,
        username: user.usernme,
        userRole: user.role,
        }, process.env.JWT_SECRET)   
      
    res.cookie("token", token)
    res.status(200).json({ 
        Message: `Welcome ${user.username}!`
        });
    } catch (err){
        next(err)
    }
})

//-----------------------------------------------------------------------------
// PUT updates user      
// /api/users/update/:id 
//-----------------------------------------------------------------------------

ur.put('/update/:id', restrict('admin'), (req, res) => {
    const { id } = req.params;
    const changes = req.body

    db.findById(id)
    .then(user => {
      if (user) {
        db.updateUser(changes, id)
       
        .then(updatedUser => {
          res.json({ 
            Success: updatedUser+ " User has been updated successfully." 
          });
        });
      } else {
        res.status(404).json({ 
          Error: "Could not find User with given id. please try another user id" 
        });
      }
    })
    .catch (err => {
      res.status(500).json({ 
        Error: "Failed to update User. please check your code" 
      });
    });
  });
  
//-----------------------------------------------------------------------------
// DELETE   user     
// /api/users/delete/:id  
//-----------------------------------------------------------------------------
ur.delete('/delete/:id', ec('superadmin'), (req, res) => {
  const { id } = req.params;

  db.removeUser(id)
  .then(deleted => {
    if (deleted) {
      res.json({ 
        Deleted: deleted + " User has been successfully deleted." 
    });
    } else {
      res.status(404).json({ 
        Error: 'Could not find User with given id. Please try another User id.' 
      });
    }
  })
  .catch(err => {
    res.status(500).json({ Error: 'Failed to delete User. Please check your code' });
  });
});

module.exports = ur