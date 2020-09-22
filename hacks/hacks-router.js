const express = require("express");
const Hacks = require("./hacks-model.js");
const router = express.Router();

//get router to findHacks from the hacks model and then display life hacks . catch error and display error: 500
router.get("/", (req, res) => {
  Hacks.findHacks()
    .then((hacks) => {
      res.json(hacks);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get life hacks " });
    });
});

//post router to addHCK to db scheme req body of hack to post. then display life hack if not catch and display error: 500
router.post("/newhack", (req, res) => {
  Hacks.addHacks(req.body)
    .then((hacks) => {
      res.status(200).json(hacks);
    })
    .catch((error) => {
      res.status(500).json({ error: "Could not add new life hack" });
    });
});

module.exports = router;
