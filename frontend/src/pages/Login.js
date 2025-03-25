import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import PageTemplate from "./base/PageTemplate";
import LoginForm from "../components/LoginForm";

const Login = () => {
    const { error, isAuthenticated, isRecaptchaOpen, isRecaptchaPassed } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        isAuthenticated && navigate("/main");
    }, [navigate, isAuthenticated]);

    return (
        <PageTemplate
            wrapperDimensions={"min-w-[360px]"}
            columnDimensions={"sm:min-w-board-btn-spacing-sm"}
        >
            <div className="flex-grow xs:mx-[3rem] md:!mx-[5rem] max-w-[37.5rem]">
                <div
                    className={`relative flex flex-col w-full my-[5rem] rounded-md bg-white drop-shadow-md transition-[height] origin-top ${
                        isRecaptchaOpen && !isRecaptchaPassed && error
                            ? "h-[28rem]"
                            : isRecaptchaOpen && !isRecaptchaPassed
                            ? "h-[25rem]"
                            : error
                            ? "h-[23rem]"
                            : "h-[20rem]"
                    }`}
                >
                    <LoginForm navigate={navigate} />
                </div>
            </div>
        </PageTemplate>
    );
};

export default Login;
