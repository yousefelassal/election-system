import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const baseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : '/api';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}