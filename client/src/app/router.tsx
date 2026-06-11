import {createBrowserRouter, Navigate} from "react-router-dom";
import {RootLayout} from "@/app/router/root.layout.tsx";
import {RootRedirect} from "@/app/router/root-redirect.tsx";
import {GuestRouter} from "@/app/router/guest-router.tsx";
import {ProtectedRouter} from "@/app/router/protected-router.tsx";
import {AuthRegisterPage} from "@/pages/auth/register/page.tsx";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <RootRedirect/> },
            {
                element: <GuestRouter />,
                children: [
                    { path: 'login', element: <h1>Login</h1>},
                    { path: 'register', element: <AuthRegisterPage />}
                ]
            },
            {
                element: <ProtectedRouter />,
                children: [
                    { path: 'events', element: <h1>Events</h1>},
                    { path: 'events/my', element: <h1>Events/my</h1>},
                    { path: 'events/new', element: <h1>Events/new</h1>},
                    { path: 'events/:id', element: <h1>Events/:id</h1>},
                    { path: 'events/:id/edit', element: <h1>Events/:id/edit</h1>}
                ]
            },
            {
                path: "*", element: <Navigate to="/" replace/>
            }
        ]
    }
])