import {createBrowserRouter} from "react-router-dom";
import {RootLayout} from "@/app/router/root.layout.tsx";
import {RootRedirect} from "@/app/router/root-redirect.tsx";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <RootRedirect/> }
        ]
    }
])