import { Link } from "react-router-dom";
import { buttonVariants } from "src/components/shadcn/ui/button";
import { cn } from "src/utils/utils";

const Error = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-50">
            <div className="flex space-x-2 text-4xl font-bold text-destructive">
                <h1>ERROR</h1>
                <div>404</div>
            </div>
            <div>
                <Link
                    className={cn(buttonVariants({ variant: "link" }))}
                    to="/"
                >
                    Back to Home Page
                </Link>
            </div>
        </div>
    );
};

export default Error;
