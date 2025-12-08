import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId!;

    const task = await prisma.task.create({
      data: { title, description, userId },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea", error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas", error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    const task = await prisma.task.findFirst({
      where: { id: Number(id), userId },
    });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const userId = req.userId!;

    const existingTask = await prisma.task.findFirst({
      where: { id: Number(id), userId },
    });
    if (!existingTask) return res.status(404).json({ message: "Tarea no encontrada" });

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const existingTask = await prisma.task.findFirst({
      where: { id: Number(id), userId },
    });
    if (!existingTask) return res.status(404).json({ message: "Tarea no encontrada" });

    await prisma.task.delete({ where: { id: Number(id) } });

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error });
  }
};
