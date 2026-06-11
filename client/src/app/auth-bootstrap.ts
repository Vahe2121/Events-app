import {useAuthStore} from "@/stores/auth-stores.ts";

let bootstrapPromise: Promise<void> | null = null

export function ensureAuthBootstraped() {
    if(!bootstrapPromise) {
        bootstrapPromise = useAuthStore.getState().bootstrap()
    }
    return bootstrapPromise
}