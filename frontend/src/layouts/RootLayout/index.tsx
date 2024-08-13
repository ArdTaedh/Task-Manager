import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="h-full w-full">
            <Header />
            <Outlet />
        </div>
    );
};

export default RootLayout;
