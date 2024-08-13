import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { backendApiUrl } from "src/utils/constants";

const useFetchUser = (id: number, token: string) => {
    const query = useQuery({
        queryKey: ["fetch-user", id],
        queryFn: () => fetchUser(id, token),
    });

    return query;
};

const fetchUser = async (id: number, token: string) => {
    try {
        if (!id || !token) {
            return {
                error: "ID or Token missing!",
            };
        }

        const request = await axios.get(`${backendApiUrl}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const response = await request.data();

        return response;
    } catch (err: any) {
        console.log(err);
        throw new Error(err);
    }
};

export default useFetchUser;
