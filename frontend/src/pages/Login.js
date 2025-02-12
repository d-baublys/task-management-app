import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import ModalButton from "../components/base/ModalButton";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../components/PageTemplate";

const Login = () => {
    const { login } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/main");
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    return (
        <PageTemplate>
            <div className="w-1/2">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center gap-4 w-full"
                >
                    <fieldset className="border-2 w-full">
                        <legend>Username</legend>
                        <input
                            className="bg-gray-400 w-full"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="border-2 w-full">
                        <legend>Password</legend>
                        <input
                            className="bg-gray-400 w-full"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                    <ModalButton type={"submit"}>Log In</ModalButton>
                </form>
            </div>
        </PageTemplate>
    );
};

export default Login;
