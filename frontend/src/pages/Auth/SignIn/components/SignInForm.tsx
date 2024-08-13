import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, buttonVariants } from "src/components/shadcn/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "src/components/shadcn/ui/form";
import { Input } from "src/components/shadcn/ui/input";
import { useAuth } from "src/providers/AuthProvider";
import { useSignIn } from "src/store/mutations/useSignIn";
import { cn } from "src/utils/utils";
import { signInSchema, SignInValues } from "src/validation/auth";
import { z } from "zod";

const SignInForm = () => {
    const navigate = useNavigate();
    const mutation = useSignIn();
    const { setUserIdHandler, setTokenHandler } = useAuth();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmitHandler = async (values: SignInValues) => {
        return mutation.mutate(values, {
            onSuccess: async (data) => {
                setTokenHandler(data.tokens.accessToken);
                setUserIdHandler(data.user.id.toString());
                navigate("/");
            },
            onError: async (err) => {
                toast.error(err.message);
            },
        });
    };

    return (
        <Form {...form}>
            <form
                className="w-[20rem] space-y-3 rounded-xl bg-white p-3"
                onSubmit={form.handleSubmit(onSubmitHandler)}
            >
                <h1 className="text-center text-xl font-bold">Sign In</h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full"
                    type="submit"
                    disabled={mutation.isPending}
                >
                    Sign In
                    {mutation.isPending && (
                        <Loader2 className="ml-3 size-4 animate-spin" />
                    )}
                </Button>
                <Link
                    className={cn(
                        buttonVariants({ variant: "link" }),
                        "h-fit p-0",
                    )}
                    to="/auth/sign-up"
                >
                    Don&apos;t have an account?
                </Link>
            </form>
        </Form>
    );
};

export default SignInForm;
