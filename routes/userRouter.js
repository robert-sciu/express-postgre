const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.param("id", userController.checkId);
/* GET home page. */
router.route("/").get(userController.getUsers).post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
