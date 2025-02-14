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
            <div className="w-1/2 max-w-[37.5rem]">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center p-4 gap-4 w-full min-w-min rounded-md bg-white text-gray-600 translate-y-[25%] drop-shadow-md"
                >
                    <fieldset className="w-full">
                        <legend className="mb-1">Username</legend>
                        <input
                            className="bg-gray-300 w-full h-8 px-2"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="w-full">
                        <legend className="mb-1">Password</legend>
                        <input
                            className="bg-gray-300 w-full h-8 px-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                    <ModalButton type={"submit"} className="w-full mt-4">
                        Log In
                    </ModalButton>
                </form>
            </div>
        </PageTemplate>
    );
};

export default Login;
