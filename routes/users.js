const express = require("express");
const {
  GetAllUsers,
  GetUserById,
  AddUser,
  DeleteUser,
  UpdateUser,
} = require("../handlers/users");
const { body } = require("express-validator");
const router = express.Router();

router
  .route("/api/user/:id")
  .get(GetUserById)
  .delete(DeleteUser)
  .patch(
    [
      body("first_name")
        .notEmpty()
        .isLength({ min: 3, max: 30 })
        .withMessage("please enter your first name with atleast 3 characters"),
      body("job_title")
        .notEmpty()
        .isLength({ min: 3, max: 30 })
        .withMessage("please enter your job title with atleast 8 characters"),
      body("gender")
        .isIn(["Male", "Female"])
        .withMessage("gender must be either Male or Female"),
    ],
    UpdateUser
  );
router.get("/api/users", GetAllUsers);
router.post(
  "/api/user",
  [
    body("first_name")
      .notEmpty()
      .isLength({ min: 3, max: 30 })
      .withMessage("please enter your first name with atleast 3 characters"),
    body("email").notEmpty().isEmail().withMessage("enter a valid email"),
    body("job_title")
      .notEmpty()
      .isLength({ min: 3, max: 30 })
      .withMessage("please enter your job title with atleast 8 characters"),
    body("gender")
      .isIn(["Male", "Female"])
      .withMessage("gender must be either Male or Female"),
  ],
  AddUser
);

module.exports = { router };
