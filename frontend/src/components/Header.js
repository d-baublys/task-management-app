import UserUnit from "./UserUnit";

const Header = () => {
    return (
        <div className="flex justify-between items-center w-full h-32 shrink-0">
            <div className="flex justify-center items-center h-full text-base xs:text-xl sm:!text-2xl md:!text-3xl font-medium text-gray-600">
                DB's Task Management App
            </div>
            <div className="flex justify-end items-center flex-1 h-full">
                <UserUnit />
            </div>
        </div>
    );
};

export default Header;
