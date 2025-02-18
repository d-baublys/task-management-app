import Header from "../../components/Header";
import ToastNotification from "../../components/ToastNotification";

const PageTemplate = ({ children, leftContent, rightContent, overlayContent, onMouseUp }) => {
    return (
        <div
            onMouseUp={onMouseUp}
            className="flex justify-between w-full min-h-full min-w-[700px] md:min-w-[800px] landscape:w-screen landscape:min-w-[600px]"
        >
            <div className="flex flex-col flex-grow items-center min-w-board-btn-spacing-sm min-h-full mx-2 md:mx-4">
                {leftContent}
            </div>
            <div className="flex flex-col w-full lg:w-3/4 min-w-min h-auto pb-16">
                <Header />
                <div className="main-board flex justify-center w-full h-full p-4 rounded-2xl">
                    {children}
                </div>
            </div>
            <div className="flex flex-col flex-grow items-center min-w-board-btn-spacing-sm min-h-full mx-2 md:mx-4">
                {rightContent}
            </div>
            <ToastNotification />
            {overlayContent}
        </div>
    );
};

export default PageTemplate;
