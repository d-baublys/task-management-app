const Tile = ({ isDragging, content }) => {
    return (
        <div
            className="w-16 h-8 bg-red-500 rounded-lg cursor-move"
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {content}
        </div>
    );
};

export default Tile;
