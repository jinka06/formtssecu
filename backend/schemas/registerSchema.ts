import * as z from 'zod';

export type RegisterData = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(20, { message: 'Username must be less than 20 characters.' }),
  age: z.coerce
    .number()
    .int()
    .min(13, { message: 'You must be at least 13 years old to register.' })
    .max(120, { message: 'Please enter a valid age.' }),
  email: z.email({ message: 'Invalid email address.' }).toLowerCase().trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Password can only contain letters, numbers, and underscores.',
    }),
  name: z
    .string()
    .min(2, { message: 'Name is required.' })
    .max(50, { message: 'Name must be less than 50 characters.' })
    .regex(/^[a-zA-Z\s\-']+$/, {
      message:
        'Name can only contain letters, spaces, hyphens, apostrophes, and periods.',
    })
    .trim(),
  bio: z
    .string()
    .max(400, { message: 'Bio must be less than 400 characters.' })
    .trim()
    .optional(),
});
