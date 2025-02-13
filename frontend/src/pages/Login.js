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
                    className="flex flex-col justify-center items-center p-4 gap-4 w-full min-w-min rounded-md bg-white translate-y-[25%]"
                >
                    <fieldset className="w-full">
                        <legend>Username</legend>
                        <input
                            className="bg-gray-400 w-full p-2 my-1"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="w-full">
                        <legend>Password</legend>
                        <input
                            className="bg-gray-400 w-full p-2 my-1"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                    <ModalButton type={"submit"} className="w-full mt-4 !bg-gray-600 text-white">
                        Log In
                    </ModalButton>
                </form>
            </div>
        </PageTemplate>
    );
};

export default Login;
