import UserUnit from "./UserUnit";

const Header = () => {
    return (
        <div className="flex justify-evenly items-center w-full h-32 bg-green-600 shrink-0">
            <div className="h-full flex-1"></div>
            <div className="flex justify-center items-center w-2/3 h-full text-3xl">
                DB's Task Management App
            </div>
            <div className="flex justify-end items-center flex-1 h-full">
                <UserUnit />
            </div>
        </div>
    );
};

export default Header;
