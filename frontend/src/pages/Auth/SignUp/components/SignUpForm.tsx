import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
import { cn } from "src/utils/utils";
import { signInSchema, SignInValues, signUpSchema } from "src/validation/auth";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSignUp } from "src/store/mutations/useSignUp";

const SignUpForm = () => {
    const navigate = useNavigate();
    const mutation = useSignUp();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmitHandler = async (values: SignInValues) => {
        return mutation.mutate(values, {
            onSuccess: async () => {
                navigate("/auth/sign-in");
            },
            onError: async (err: any) => {
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
                <h1 className="text-center text-xl font-bold">Sign Up</h1>
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
                    Sign Up
                    {mutation.isPending && (
                        <Loader2 className="ml-3 size-4 animate-spin" />
                    )}
                </Button>
                <Link
                    className={cn(
                        buttonVariants({ variant: "link" }),
                        "h-fit p-0",
                    )}
                    to="/auth/sign-in"
                >
                    Have an account?
                </Link>
            </form>
        </Form>
    );
};

export default SignUpForm;
