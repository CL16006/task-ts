import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createTaskSchema, updateTaskSchema, taskIdParamsSchema } from "../validators/schemas";
import { validateBody, validate } from "../middlewares/validationMiddleware";
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.userId!;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        completed: completed || false,
        userId
      }
    });

    return res.status(201).json({
      success: true,
      message: "Tarea creada exitosamente",
      task
    });
  } catch (error) {
    console.error("Error en createTask:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({
      success: true,
      message: "Tareas obtenidas exitosamente",
      tasks
    });
  } catch (error) {
    console.error("Error en getTasks:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const taskId = parseInt(id, 10);
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tarea no encontrada"
      });
    }

    return res.json({
      success: true,
      message: "Tarea obtenida exitosamente",
      task
    });
  } catch (error) {
    console.error("Error en getTaskById:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    const { title, description, completed } = req.body;

    const taskId = parseInt(id, 10);
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tarea no encontrada"
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        completed
      }
    });

    return res.json({
      success: true,
      message: "Tarea actualizada exitosamente",
      task: updatedTask
    });
  } catch (error) {
    console.error("Error en updateTask:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const taskId = parseInt(id, 10);

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tarea no encontrada"
      });
    }

    await prisma.task.delete({
      where: { id: taskId }
    });

    return res.json({
      success: true,
      message: "Tarea eliminada exitosamente"
    });
  } catch (error) {
    console.error("Error en deleteTask:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};









    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tarea no encontrada"
      });
    }

    return res.json({
      success: true,
      message: "Tarea obtenida exitosamente",
      task
    });
  } catch (error) {


    console.error("Error en getTaskById:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};


export const updateTask = async (req: Request, res: Response) => {
  try {









    const { id } = req.params;
    const userId = req.userId!;



    const taskId = parseInt(id, 10);
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId
      }
    });






    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Tarea no encontrada"
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        completed
      }
    });

    return res.json({
      success: true,
      message: "Tarea actualizada exitosamente",
      task: updatedTask
    });
  } catch (error) {

    console.error("Error en updateTask:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

