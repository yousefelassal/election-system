import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const baseUrl = import.meta.env.VITE_BASE_URL;

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}