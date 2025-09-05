import React, { SetStateAction } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface FormInputBaseProps {
    legendText: string;
    value: string;
    valueSetter: React.Dispatch<SetStateAction<string>>;
}

interface FormInputTextProps extends FormInputBaseProps {
    type: "email";
    passwordVisiblityBoolean?: never;
    passwordVisibilitySetter?: never;
}

interface FormInputPasswordProps extends FormInputBaseProps {
    type: "password";
    passwordVisiblityBoolean: boolean;
    passwordVisibilitySetter: React.Dispatch<SetStateAction<boolean>>;
}

export default function FormInput({
    type,
    legendText,
    value,
    valueSetter,
    passwordVisiblityBoolean,
    passwordVisibilitySetter,
}: FormInputTextProps | FormInputPasswordProps) {
    return (
        <fieldset className="relative w-full">
            <legend className="mb-1">{legendText}</legend>
            <label className="flex w-full bg-gray-300 focus-within:outline outline-blue-600 outline-2">
                <input
                    className="w-[93%] px-2 h-8  bg-inherit outline-none"
                    type={type === "email" ? type : passwordVisiblityBoolean ? "text" : "password"}
                    value={value}
                    required
                    onChange={(e) => valueSetter(e.target.value)}
                />
            </label>
            {type === "password" && (
                <button
                    type="button"
                    className="absolute right-2 top-1/4 cursor-pointer"
                    onClick={() => passwordVisibilitySetter?.((prev) => !prev)}
                >
                    {passwordVisiblityBoolean ? <IoEyeOff /> : <IoEye />}
                </button>
            )}
        </fieldset>
    );
}
