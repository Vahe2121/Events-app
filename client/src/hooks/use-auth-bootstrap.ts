import {use} from "react";
import {useAuthStore} from "@/stores/auth-stores.ts";
import {ensureAuthBootstraped} from "@/app/auth-bootstrap.ts";

export function useAuthBootstrap() {
    use(ensureAuthBootstraped())

    return useAuthStore(state => state.user);
}