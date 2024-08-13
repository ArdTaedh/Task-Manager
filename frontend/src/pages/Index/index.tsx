import { useAuth } from "src/providers/AuthProvider";

const IndexPage = () => {
    const user = useAuth();

    console.log(user, "test");

    return <div>IndexPage</div>;
};

export default IndexPage;
