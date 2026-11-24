import { z } from "zod";

// Schema para registro de usuario
export const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
});

// Schema para login paso 1
export const loginStep1Schema = z.object({
  email: z.string().email("Correo electrónico inválido")
});

// Schema para login paso 2
export const loginStep2Schema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
});

// Schema para reenvío de OTP
export const resendOtpSchema = z.object({
  email: z.string().email("Correo electrónico inválido")
});

// Schema para creación de tarea
export const createTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  completed: z.boolean().optional()
});

// Schema para actualización de tarea
export const updateTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional()
});

// Schema para obtener tarea por ID
export const taskIdParamsSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)).refine((val) => val > 0, "ID inválido")
});

