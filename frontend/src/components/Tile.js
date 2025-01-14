const Tile = ({ isDragging, content }) => {
    return (
        <div
            className={`w-16 h-8 bg-red-500 rounded-lg cursor-move ${isDragging && "opacity-50"}`}
        >
            {content}
        </div>
    );
};

export default Tile;
