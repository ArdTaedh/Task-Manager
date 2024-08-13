import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import { AuthProvider } from "./providers/AuthProvider";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { Toaster } from "sonner";

const App = () => {
    return (
        <ReactQueryProvider>
            <AuthProvider>
                <RouterProvider router={router} />
                <Toaster richColors />
            </AuthProvider>
        </ReactQueryProvider>
    );
};

export default App;
