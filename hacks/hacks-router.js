/*
 * FileName: pr.js
 * Title: Posts Router File
 */
//-----------------------------------------------------------------------------
/*  dependencies  */
const express = require('express')
const db = require("./hacks-model");
/*  entry check middleware  */
const ec = require('../middleware/restrict')
/*  Post Router  */
const pr = express.Router()
//-----------------------------------------------------------------------------

/*  Posts EndPoints  */

//-----------------------------------------------------------------------------
/*  Add New Post  */
//-----------------------------------------------------------------------------
pr.post('/add', ec('basic'), async (req, res, next) => {
    try { 
        const postData = req.body
        const post = await db.addPost(postData)
        
        if (!postData) {
            return res.status(400).json({
                Error: "Could not add post. Please check your data and try again"
            })
        } else if (!post) {
            return res.status(500).json({
                Error: "Failed adding post. Please contact an administrator"
            })
        } else if (post){
            return res.status(201).json({
                Success: "Your post was added successfuly!"
                 
            })
        }

    } catch (err) {
        next(err)
    }
})

//-----------------------------------------------------------------------------
/*  Update Post By Id  */
//-----------------------------------------------------------------------------
pr.put('/update/:id', ec('admin'), async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    await db.findPostById(id)
    .then(post => {
      if (post) {
        db.updatePost(changes, id)
        .then(updatedPost=> {
          res.json({ 
            Success: updatedPost+ " Post has been updated successfully." 
          });
        });
      } else {
        res.status(404).json({ 
          Error: "Could not find Post with given id. please try another Post id" 
        });
      }
    })
    .catch (err => {
      res.status(500).json({ 
        Error: "Failed to update Post. please check your code" 
      });
    });
  });

//-----------------------------------------------------------------------------
/*  Delete Post  */
//-----------------------------------------------------------------------------
pr.delete('/delete/:id', ec('admin'), async (req, res) => {
    const { id } = req.params;

    await db.deletePost(id)
    .then(deleted => {
      if (deleted) {
        res.json({ 
          Deleted: deleted + " Post has been successfully deleted." 
      });
      } else {
        res.status(404).json({ 
          Error: 'Could not find Post with given id. Please try another Post id.' 
        });
      }
    })
    .catch(err => {
      res.status(500).json({ 
          Error: 'Failed to delete Post. Please check your code' 
        });
    });
  });

//-----------------------------------------------------------------------------
/*  Find Post By Id  */
//-----------------------------------------------------------------------------
pr.get('/:id', ec('basic'), async (req, res) => {
    const { id } = req.params;

    await db.findPostById(id)
    .then(post => {
      if (post) {
        return res.status(200).json(post);
      } else {
        res.status(404).json({ 
          Error: "Could not find post with given id. Please check line 23" 
        })
      }
    })
    .catch(err => {
      res.status(500).json({ 
          Error: 'Failed to get post. Please check line 23' 
        });
    });
  });
   
  //-----------------------------------------------------------------------------
  /*  Get All Posts  */
  //-----------------------------------------------------------------------------
  pr.get('/posts/getall', async (req, res, next) => {
    try {
        const posts = await db.findAllPosts()
         res.status(200).json(posts)
   }catch (err){
       next(err)
   }
 
 })

 module.exports = pr;