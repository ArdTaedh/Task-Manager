import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { backendApiUrl } from "src/utils/constants";
import { SignUpValues } from "src/validation/auth";

export const useSignUp = () => {
    const mutation = useMutation({
        mutationKey: ["sign-up"],
        mutationFn: (values: SignUpValues) => signUp(values),
    });

    return mutation;
};

const signUp = async (values: SignUpValues) => {
    try {
        const request = await axios.post(
            `${backendApiUrl}/auth/sign-up`,
            values,
        );

        return await request.data;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};
