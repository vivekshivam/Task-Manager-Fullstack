import { Request, Response } from "express";
import prisma from "../utils/prisma";

// CREATE TASK
export const createTask = async (req: any, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        userId: req.userId,
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// GET TASKS
export const getTasks = async (req: any, res: Response) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId,
        ...(status !== undefined && {
          completed: status === "true",
        }),
        ...(search && {
          title: {
            contains: String(search),
          },
        }),
      },
      skip,
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// UPDATE TASK
export const updateTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: { title },
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// DELETE TASK
export const deleteTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id },
    });

    return res.json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// TOGGLE TASK (FIXED SECURITY)
export const toggleTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
};