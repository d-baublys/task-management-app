const Tile = ({ isDragging, description, dueDate }) => {
    return (
        <div className={`w-full bg-red-500 p-2 rounded-lg break-all cursor-move ${isDragging && "opacity-50"}`}>
            <div className={`w full px-2 py-1 rounded-md bg-white`}>
                {description}
            </div>
            <div className="mt-2">{dueDate}</div>
        </div>
    );
};

export default Tile;
