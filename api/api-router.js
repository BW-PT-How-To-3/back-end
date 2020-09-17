const router = require("express").Router();

const hacksRouter = require("../hacks/hacks-router");
const usersRouter = require("../users/users-router");

router.use("/hacks", hacksRouter);
router.use("/users", usersRouter);

module.exports = router;
