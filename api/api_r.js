const router = require("express").Router();

/*  Howto Router  */
const hr = require("../howtos/howto_r");

/*  Users Router  */
const ur = require("../users/users_r");

router.use("/howto", hr);
router.use("/users", ur);
router.use("/", (req, res) => {
    res.json({ Message: "Welcome to the HowTo API!"})
})

module.exports = router;
