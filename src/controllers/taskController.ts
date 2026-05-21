import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  createTaskSchema,
  taskIdParamsSchema,
  updateTaskSchema,
} from "../validators/schemas";

export const createTask = async (req: Request, res: Response) => {
  try {
    const validation = createTaskSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { title, description } = validation.data;
    const userId = req.userId!;

    const task = await prisma.task.create({
      data: { title, description: description ?? null, userId },
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
    const paramsValidation = taskIdParamsSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      return res.status(400).json({
        message: "Parámetros inválidos",
        errors: paramsValidation.error.flatten().fieldErrors,
      });
    }

    const { id } = paramsValidation.data;
    const userId = req.userId!;
    const task = await prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tarea", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const paramsValidation = taskIdParamsSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      return res.status(400).json({
        message: "Parámetros inválidos",
        errors: paramsValidation.error.flatten().fieldErrors,
      });
    }

    const bodyValidation = updateTaskSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: bodyValidation.error.flatten().fieldErrors,
      });
    }

    const { id } = paramsValidation.data;
    const { title, description, completed } = bodyValidation.data;
    const userId = req.userId!;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const data: any = {};

    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (completed !== undefined) data.completed = completed;

    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const paramsValidation = taskIdParamsSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      return res.status(400).json({
        message: "Parámetros inválidos",
        errors: paramsValidation.error.flatten().fieldErrors,
      });
    }

    const { id } = paramsValidation.data;
    const userId = req.userId!;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });
    if (!existingTask) return res.status(404).json({ message: "Tarea no encontrada" });

    await prisma.task.delete({ where: { id } });

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea", error });
  }
};
