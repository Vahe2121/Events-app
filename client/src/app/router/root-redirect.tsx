import {Navigate} from "react-router-dom";
import {useAuthBootstrap} from "@/hooks/use-auth-bootstrap.ts";

export const RootRedirect = () => {
    const user = useAuthBootstrap()

    return <Navigate to={user ? '/events' : '/login'} replace/>
}