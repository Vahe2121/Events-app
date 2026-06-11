import {useAuthBootstrap} from "@/hooks/use-auth-bootstrap.ts";
import {Navigate} from "react-router-dom";
import {ProtectedLayout} from "@/app/router/protected-layout.tsx";

export function ProtectedRouter() {
    const user = useAuthBootstrap()

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    return <ProtectedLayout />
}