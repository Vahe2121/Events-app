import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "@/stores/auth-stores.ts";
import {useState, type SubmitEvent} from "react";
import {AuthFormCard} from "@/pages/auth/components/auth.form.card.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {AuthFormErrorAlert} from "@/pages/auth/components/auth-form-error-alert.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button";


export function RegisterForm() {
    const navigate = useNavigate();
    const register = useAuthStore(s => s.register);
    const authError = useAuthStore(s => s.authError);
    const isAuthLoading = useAuthStore(s => s.isAuthLoading);

    const [clientError, setClientError] = useState<string | null>(null);

    const handleSubmit = async (event : SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setClientError(null);

        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get("name") ?? '').trim();
        const email = String(formData.get("email") ?? '').trim();
        const password = String(formData.get("password") ?? '');
        const confirmPassword = String(formData.get("confirm-password") ?? '');

        if (password !== confirmPassword) {
            setClientError('the passwords dont match');

            return;
        }

        if (password.length < 8) {
            setClientError('the password cannot be shorter than 8 characters');

            return;
        }

        if (name.length < 2) {
            setClientError('name cannot be longer than 2 characters');
        }

        try {
            await register({ name, email, password });
        } catch (error) {

        }
    }

    const topError = clientError ?? authError

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <AuthFormCard title="Registration">
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <AuthFormErrorAlert message={topError}/>
                        <Field>
                            <FieldLabel htmlFor="register-name">Name</FieldLabel>
                            <Input
                                id="register-name"
                                name="name"
                                type="text"
                                placeholder="Name Surname"
                                autoComplete="name"
                                required
                                minLength={2}
                                maxLength={100}
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="register-email">Email</FieldLabel>
                            <Input
                                id="register-email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                required
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="register-password">Password</FieldLabel>
                            <Input
                                id="register-password"
                                name="password"
                                type="password"
                                autoComplete="new-email"
                                required
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="register-confirm-password">Confirm password</FieldLabel>
                            <Input
                                id="register-confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-email"
                                required
                                disabled={isAuthLoading}
                            />
                        </Field>
                        <Field>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isAuthLoading}
                            >
                                {isAuthLoading ? "Creating..." : "Create account"}
                            </Button>
                            <FieldDescription className="text-center">
                                Already have an account?{' '}
                                <Link
                                    className="underline-offset-4 hover:underline"
                                    to="/login"
                                    onClick={() => {
                                        useAuthStore.getState().clearAuthError()
                                        setClientError(null)
                                    }}
                                >Login</Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </AuthFormCard>
        </div>
    )
}