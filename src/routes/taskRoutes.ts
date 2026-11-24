import express from "express";
import { 
  createTask, 
  getTasks, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateBody, validate } from "../middlewares/validationMiddleware";
import { createTaskSchema, updateTaskSchema, taskIdParamsSchema } from "../validators/schemas";

const router = express.Router();

// Middleware de autenticación para todas las rutas
router.use(authMiddleware);

// Ruta para crear una tarea
router.post("/", validateBody(createTaskSchema), createTask);

// Ruta para obtener todas las tareas del usuario
router.get("/", getTasks);

// Ruta para obtener una tarea por ID
router.get("/:id", validate(validateBody(taskIdParamsSchema)), getTaskById);

// Ruta para actualizar una tarea
router.put("/:id", 
  validate(validateBody(taskIdParamsSchema)), 
  validateBody(updateTaskSchema), 
  updateTask
);

// Ruta para eliminar una tarea
router.delete("/:id", validate(validateBody(taskIdParamsSchema)), deleteTask);

export default router;


// Ruta para crear una tarea
router.post("/", validateBody(createTaskSchema), createTask);

// Ruta para obtener todas las tareas del usuario
router.get("/", getTasks);




export default router;
