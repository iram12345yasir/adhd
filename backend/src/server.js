import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
  })
);
app.use(express.json());

const generateToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ADHD API is running" });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const token = generateToken(user);

  res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

app.get("/api/tasks", authMiddleware, async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" }
  });

  res.json(tasks);
});

app.post("/api/tasks", authMiddleware, async (req, res) => {
  const { title, priority, focusMinutes } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      priority: priority || "medium",
      focusMinutes: Number(focusMinutes) || 25,
      userId: req.user.id
    }
  });

  res.status(201).json(task);
});

app.patch("/api/tasks/:id", authMiddleware, async (req, res) => {
  const task = await prisma.task.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: { done: !task.done }
  });

  res.json(updated);
});

app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
  const task = await prisma.task.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await prisma.task.delete({ where: { id: task.id } });
  res.json({ success: true });
});

app.get("/api/habits", authMiddleware, async (req, res) => {
  const habits = await prisma.habit.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" }
  });

  res.json(habits);
});

app.post("/api/habits", authMiddleware, async (req, res) => {
  const { name, target } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Habit name is required" });
  }

  const habit = await prisma.habit.create({
    data: {
      name: name.trim(),
      target: Number(target) || 1,
      userId: req.user.id
    }
  });

  res.status(201).json(habit);
});

app.patch("/api/habits/:id", authMiddleware, async (req, res) => {
  const habit = await prisma.habit.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!habit) {
    return res.status(404).json({ message: "Habit not found" });
  }

  const updated = await prisma.habit.update({
    where: { id: habit.id },
    data: { count: Math.min(habit.count + 1, habit.target + 2) }
  });

  res.json(updated);
});

app.post("/api/focus-sessions", authMiddleware, async (req, res) => {
  const { minutes } = req.body;

  const session = await prisma.focusSession.create({
    data: {
      minutes: Number(minutes) || 25,
      completed: true,
      userId: req.user.id
    }
  });

  res.json(session);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`ADHD API listening on port ${port}`);
});
