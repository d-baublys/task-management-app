import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import ModalButton from "../components/base/ModalButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
        navigate("/main");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <fieldset className="border-2">
                <legend>Username</legend>
                <input
                    className="bg-gray-400"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </fieldset>
            <fieldset className="border-2">
                <legend>Password</legend>
                <input
                    className="bg-gray-400"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </fieldset>
            <ModalButton type={"submit"}>Log In</ModalButton>
        </form>
    );
};

export default Login;
