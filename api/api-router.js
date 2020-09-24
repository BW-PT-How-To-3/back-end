const router = require("express").Router();

const hr = require("../howtos/howto-router");
const ur = require("../users/users-router");

router.use("/howto", hr);
router.use("/users", ur);

module.exports = router;


