import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number) {
  const absNumber = Math.abs(number)
  if (absNumber >= 1000) {
    return (number / 1000).toFixed(2).replace(/\.0$/, "") + "k"
  }
  return number.toFixed(2)
}
