import { z } from "zod";

export const AddShortcut = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  url: z
    .string()
    .trim()
    .url("Please enter a valid URL"),

  des: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  category: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
      }),
    )
    .default([]),
});

export type AddShortcutInput = z.input<typeof AddShortcut>;
export type AddShortcutOutput = z.output<typeof AddShortcut>;