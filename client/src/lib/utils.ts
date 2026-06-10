import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type {ApiErrorResponse} from "@/shared/api/types.ts";
import {isAxiosError} from "@/shared/api/http";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiErrorMessage(error: unknown, fallback = 'Something was wrong'):string {
   if (isAxiosError<ApiErrorResponse>(error)) {
     const data = error.response?.data

      if (data && typeof data.message === "string") {
        return data.message
      }
   }

   if (error instanceof Error) {
     return error.message
   }

   return fallback
}
