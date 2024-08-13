import axios from "axios";
import { backendApiUrl } from "./constants";

export const axiosDefault = axios.create({
    baseURL: backendApiUrl,
    headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
    baseURL: backendApiUrl,
    headers: { "Content-Type": "application/json" },
});
