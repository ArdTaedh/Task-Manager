import { buttonVariants } from "src/components/shadcn/ui/button";
import { Link } from "react-router-dom";
import { cn } from "src/utils/utils";

const Header = () => {
    return (
        <header className="h-16 bg-slate-50">
            <div className="container flex h-full w-full flex-row items-center">
                <h1>SiteName</h1>
                <Link
                    className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "sm:ms-auto",
                    )}
                    to="/auth/sign-in"
                >
                    Sign in
                </Link>
            </div>
        </header>
    );
};

export default Header;
