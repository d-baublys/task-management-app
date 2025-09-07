import React from "react";
import PageTemplate from "./PageTemplate";
import LoginSignUpForm from "../../components/LoginSignUpForm";
import { FormVariants } from "../../lib/definitions";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function LogInSignUpPage({
    variant,
    overrides,
}: {
    variant: FormVariants;
    navigate: NavigateFunction;
    overrides?: string;
}) {
    const navigate = useNavigate();

    return (
        <PageTemplate
            wrapperDimensions={"min-w-[360px]"}
            columnDimensions={"sm:min-w-board-btn-spacing-sm"}
        >
            <div className="flex-grow xs:mx-[3rem] md:!mx-[5rem] max-w-[37.5rem]">
                <div
                    className={`relative flex flex-col w-full my-[5rem] rounded-md bg-white drop-shadow-md transition-[height] origin-top ${
                        overrides ?? ""
                    }`}
                >
                    <LoginSignUpForm variant={variant} navigate={navigate} />
                </div>
            </div>
        </PageTemplate>
    );
}
