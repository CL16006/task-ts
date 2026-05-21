import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginStep1Schema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const loginStep2Schema = z.object({
  email: z.email("Email inválido"),
  code: z.string().regex(/^\d{6}$/, "El código debe tener 6 dígitos"),
});

export const resendOtpSchema = z.object({
  email: z.email("Email inválido"),
});

export const taskIdParamsSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un entero positivo"),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "El título es requerido"),
  description: z.string().trim().max(1000).optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().max(1000).optional(),
    completed: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

