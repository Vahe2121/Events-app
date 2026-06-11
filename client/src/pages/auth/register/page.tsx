import {AuthScreenLayout} from "@/pages/auth/components/auth-screen-layout.tsx";
import {RegisterForm} from "@/pages/auth/components/register-form.tsx";

export function AuthRegisterPage() {
    return (
        <AuthScreenLayout>
           <RegisterForm></RegisterForm>
        </AuthScreenLayout>
    )
}