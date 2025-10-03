import React from "react";
import Header from "../../components/Header";
import ToastNotification from "../../components/ToastNotification";

interface Props {
    children: React.ReactNode;
    leftContent?: React.ReactElement;
    rightContent?: React.ReactElement;
    onMouseUp?: () => void;
    wrapperDimensions?: string;
    columnDimensions?: string;
}

const PageTemplate = ({
    children,
    leftContent,
    rightContent,
    onMouseUp,
    wrapperDimensions,
    columnDimensions,
}: Props) => {
    return (
        <div
            onMouseUp={onMouseUp}
            onTouchEnd={onMouseUp}
            className={`flex justify-between w-full min-h-full landscape:w-screen landscape:min-w-[600px] ${
                wrapperDimensions ? wrapperDimensions : "min-w-[700px] md:min-w-[800px]"
            }`}
        >
            <div
                className={`flex flex-col flex-grow items-center min-h-full mx-2 md:mx-4 ${
                    columnDimensions ? columnDimensions : "min-w-board-btn-spacing-sm"
                }`}
            >
                {leftContent}
            </div>
            <div className="flex flex-col w-full lg:w-3/4 min-w-min h-auto pb-16">
                <Header />
                <div className="main-board flex justify-center w-full h-full p-4 rounded-2xl">
                    {children}
                </div>
            </div>
            <div
                className={`flex flex-col flex-grow items-center min-h-full mx-2 md:mx-4 ${
                    columnDimensions ? columnDimensions : "min-w-board-btn-spacing-sm"
                }`}
            >
                {rightContent}
            </div>
            <ToastNotification />
        </div>
    );
};

export default PageTemplate;
