/**
 * Utility helpers shared across the project.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS class names intelligently.
 * Uses clsx to handle conditional classes, then twMerge to
 * de-duplicate / resolve conflicting Tailwind utilities.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
