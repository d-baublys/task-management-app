const Tile = ({ isDragging, content }) => {
    return (
        <div className={`w-full min-h-min bg-red-500 rounded-lg break-all cursor-move ${isDragging && "opacity-50"}`}>
            {content}
        </div>
    );
};

export default Tile;
