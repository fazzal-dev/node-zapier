import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserData {
  userId: string;
  data: any;
}

const users: User[] = [];
const userData: UserData[] = [];

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  const id = Date.now().toString();
  const newUser: User = { id, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post("/user/:id/data", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const newUserData: UserData = { userId: id, data };
  userData.push(newUserData);
  res.status(201).json(newUserData);
});

app.get("/user/:id/data", (req, res) => {
  const { id } = req.params;
  const userDataItems = userData.filter((item) => item.userId === id);
  res.json(userDataItems);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
