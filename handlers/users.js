const Users = require("../USERS_DATA.json");
const { validationResult } = require("express-validator");
const fs = require("fs");
const { asyncHandler } = require("../error/error");

const GetAllUsers = asyncHandler((req, res) => {
  if (req.query.limit) {
    const limited_users = Users.slice(0, req.query.limit);
    res.status(200).json(limited_users);
  } else {
    res.status(200).json(Users);
  }
});

const GetUserById = asyncHandler((req, res) => {
  const id = Number(req.params.id);
  const single_user = Users.find((data) => {
    return data.id == id;
  });
  if (!single_user) {
    res.status(404).json({ message: "user not found" });
    return;
  }
  res.status(200).json(single_user);
});

//post requests
const AddUser = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ sucess: false, message: result.array() });
  }
  const body = req.body;
  let get_prev_id = Users[Users.length - 1].id;
  body.id = ++get_prev_id;
  Users.push(body);
  await fs.writeFileSync("./USERS_DATA.json", JSON.stringify(Users), "utf-8");
  res.json(body);
});

const UpdateUser = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ success: false, message: result.array() });
  }
  const index = Users.findIndex((user) => user.id === Number(req.params.id));
  if (index !== -1) {
    Users[index].first_name = req.body.first_name;
    Users[index].last_name = req.body.last_name;
    Users[index].job_title = req.body.job_title;
    Users[index].gender = req.body.gender;
    await fs.writeFileSync("./USERS_DATA.json", JSON.stringify(Users), "utf-8");
    return res.status(200).json({
      success: true,
      message: "User successfully updated",
      user: Users[index],
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

const DeleteUser = asyncHandler(async (req, res) => {
  // Find the index based on the id
  const index = Users.findIndex((user) => user.id === Number(req.params.id));

  if (index !== -1) {
    Users.splice(index, 1); // Remove the user at the found index
    await fs.writeFileSync("./USERS_DATA.json", JSON.stringify(Users), "utf-8");

    return res.status(200).json({
      success: true,
      message: "User successfully deleted",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

module.exports = { GetAllUsers, GetUserById, AddUser, DeleteUser, UpdateUser };
