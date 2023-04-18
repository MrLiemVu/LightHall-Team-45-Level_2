const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// import fetch from
const dotenv = require("dotenv");
dotenv.config();
const { MONGO_DB } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_DB);
}

const taskSchema = new mongoose.Schema({
  name: String,
  tasks: [
    { status: Number, title: String, description: String, dueDate: String },
  ],
});
const UserTask = mongoose.model("tasks", taskSchema);

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

// const user2 = new User({
//   name: "Saumya",
//   password: "sam",
// });
// user2.save();
// const user1 = new UserTask({
//   name: "Saumya",
//   tasks: [
//     {
//       title: "Completing level 2 SESL",
//       description: "lol",
//       status: 0,
//       dueDate: "1999-09-09",
//     },
//     {
//       title: "Completing level 2 SESL",
//       description: "lol",
//       status: 0,
//       dueDate: "1999-09-09",
//     },
//   ],
// });
// user1.save();
app.get("/", (req, res) => {
  res.status(200).send("Hello from backend");
});

//Login
app.post("/login", (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name: name }).then(async (entry) => {
    if (entry) {
      if (password === entry.password) {
        res.status(200).send({ message: name });
      }
    } else {
      res.status(250).send("wrong pass");
    }
  });
});

//Register

// Route for adding a new task and returning a list of updated tasks
app.post("/addTask", (req, res) => {
  try {
    // console.log(req.body);
    const userName = req.body.name;
    const { title, description, status, dueDate } = req.body.task;
    // console.log(userName, title, description, status, dueDate);
    UserTask.findOne({ name: userName }).then(async (entry) => {
      if (entry) {
        entry.tasks.push({
          title: title,
          description: description,
          status: status,
          dueDate: dueDate,
        });
        await entry.save();
        UserTask.find({}).then((entries) => {
          res.status(200).send({ message: entries });
        });
      } else {
        res.status(250).send({ message: "no user found" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});

app.listen(process.env.PORT || 9002, () => {
  console.log("Backend started at port 9002");
});
