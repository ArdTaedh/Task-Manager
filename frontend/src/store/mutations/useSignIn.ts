import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { backendApiUrl } from "src/utils/constants";
import { SignInValues } from "src/validation/auth";

type SignInResponse = {
    user: {
        id: number;
        email: string;
        username: string | null;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
};

export const useSignIn = () => {
    const mutation = useMutation({
        mutationKey: ["sign-in"],
        mutationFn: (values: SignInValues) => signIn(values),
    });

    return mutation;
};

const signIn = async (values: SignInValues) => {
    try {
        const request = await axios.post<SignInResponse>(
            `${backendApiUrl}/auth/sign-in`,
            values,
        );

        const response = await request.data;

        return response;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};
