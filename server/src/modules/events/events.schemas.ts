import { z } from 'zod';

const startedAt = z
    .string()
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
        message: "startsAt must be validate in ISO format.",
    })
    .transform((value) => new Date(value))

export const createEventSchema = z.object({
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1),
    capacity: z.number().int().positive(),
    address: z.string().trim().min(1).max(255),
    startedAt: startedAt,
})

export const updateEventSchema = z.object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().min(1).optional(),
    capacity: z.number().int().positive().optional(),
    address: z.string().trim().min(1).max(255).optional(),
    startedAt: startedAt.optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update."
})