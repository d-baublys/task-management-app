import Header from "../components/Header";

const PageTemplate = ({
    children,
    leftContent,
    rightContent,
    overlayContent,
    onMouseUp,
    style,
}) => {
    return (
        <div onMouseUp={onMouseUp} className="flex w-full min-h-full">
            <div className="flex flex-grow justify-center min-h-full">{leftContent}</div>
            <div className="flex flex-col w-3/4 h-auto pb-32">
                <Header />
                <div className="main-board flex justify-center w-full h-full p-4 rounded-2xl">
                    {children}
                </div>
            </div>
            <div className="flex flex-grow justify-center min-h-full">{rightContent}</div>
            {overlayContent}
        </div>
    );
};

export default PageTemplate;
