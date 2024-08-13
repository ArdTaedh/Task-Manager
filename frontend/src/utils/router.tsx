import SignInPage from "pages/Auth/SignIn";
import SignUpPage from "pages/Auth/SignUp";
import Error from "pages/Error";
import IndexPage from "pages/Index";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "src/layouts/RootLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <IndexPage />,
            },
        ],
    },
    {
        path: "/auth/sign-in",
        element: <SignInPage />,
    },
    {
        path: "/auth/sign-up",
        element: <SignUpPage />,
    },
    {
        path: "*",
        element: <Error />,
    },
]);

export default router;
