import React, { useState } from "react";
import PageTemplate from "./PageTemplate";
import LoginSignUpForm from "../../components/LoginSignUpForm";
import { FormVariants } from "../../lib/definitions";
import { NavigateFunction } from "react-router";

export default function LogInSignUpPage({
    variant,
    navigate,
    recaptchaRenderOverride,
}: {
    variant: FormVariants;
    navigate: NavigateFunction;
    recaptchaRenderOverride?: boolean;
}) {
    const [isRecaptchaOpen, setIsRecaptchaOpen] = useState<boolean>(false);
    const [isRecaptchaPassed, setIsRecaptchaPassed] = useState<boolean>(!!recaptchaRenderOverride);
    const [error, setError] = useState<string>("");

    let conditionalClasses = "";

    if (variant === "signUp") {
        conditionalClasses = `${error ? "h-[26rem]" : "h-[22.75rem]"}`;
    } else {
        conditionalClasses = `${
            isRecaptchaOpen && !isRecaptchaPassed && error
                ? "h-[31rem]"
                : isRecaptchaOpen && !isRecaptchaPassed
                ? "h-[28rem]"
                : error
                ? "h-[26rem]"
                : "h-[22.5rem] sm:h-[21.5rem]"
        }`;
    }

    return (
        <PageTemplate
            wrapperDimensions={"min-w-[360px]"}
            columnDimensions={"sm:min-w-board-btn-spacing-sm"}
        >
            <div className="flex-grow xs:mx-[3rem] md:!mx-[5rem] max-w-[37.5rem]">
                <div
                    className={`relative flex flex-col w-full my-[5rem] rounded-md bg-white dark:bg-gray-700 drop-shadow-md theme-transition-all origin-top ${conditionalClasses}`}
                >
                    <LoginSignUpForm
                        variant={variant}
                        navigate={navigate}
                        isRecaptchaOpen={isRecaptchaOpen}
                        setIsRecaptchaOpen={setIsRecaptchaOpen}
                        isRecaptchaPassed={isRecaptchaPassed}
                        setIsRecaptchaPassed={setIsRecaptchaPassed}
                        errorMessage={error}
                        errorSetter={setError}
                    />
                </div>
            </div>
        </PageTemplate>
    );
}
