import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const zapierWebHook = process.env.ZAPIER_WEBHOOK_URL;

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const id = Date.now().toString();
  const newUser: User = { id, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post("/user/:id/data", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!data) {
    return res.status(400).json({ error: "Data is required" });
  }

  if (!users.find((user) => user.id === id)) {
    return res.status(404).json({ error: "User not found" });
  }

  const newUserData: UserData = { userId: id, data };
  userData.push(newUserData);

  if (zapierWebHook) {
    try {
      await axios.post(zapierWebHook, newUserData);
      console.log("Data sent to Zapier successfully");
    } catch (err) {
      console.error("Error sending data to Zapier:", err);
    }
  }
  res.status(201).json(newUserData);
});

app.get("/user/:id/data", (req, res) => {
  const { id } = req.params;

  if (!users.find((user) => user.id === id)) {
    return res.status(404).json({ error: "User not found" });
  }

  const userDataItems = userData.filter((item) => item.userId === id);
  res.json(userDataItems);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
