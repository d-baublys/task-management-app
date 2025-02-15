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
        <div
            onMouseUp={onMouseUp}
            className="flex justify-between w-full min-h-full min-w-[700px] md:min-w-[800px] landscape:w-screen landscape:min-w-[600px]"
        >
            <div className="flex flex-grow justify-center min-h-full">{leftContent}</div>
            <div className="flex flex-col w-full lg:w-3/4 min-w-min h-auto pb-16">
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
