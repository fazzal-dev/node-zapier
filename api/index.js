"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
const zapierWebHook = process.env.ZAPIER_WEBHOOK_URL;
app.use(express_1.default.json());
const users = [];
const userData = [];
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/user", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }
    const id = Date.now().toString();
    const newUser = { id, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.post("/user/:id/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: "Data is required" });
    }
    if (!users.find((user) => user.id === id)) {
        return res.status(404).json({ error: "User not found" });
    }
    const newUserData = { userId: id, data };
    userData.push(newUserData);
    if (zapierWebHook) {
        try {
            yield axios_1.default.post(zapierWebHook, newUserData);
            console.log("Data sent to Zapier successfully");
        }
        catch (err) {
            console.error("Error sending data to Zapier:", err);
        }
    }
    res.status(201).json(newUserData);
}));
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
