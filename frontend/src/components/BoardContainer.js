import Board from "./Board";

const BoardContainer = ({ tasks, setTasks, moveTask, reorderTasks, boardTitles }) => {
    const handleDrop = (id, targetBoard) => {
        moveTask(id, targetBoard);
    };

    return (
        <div className="flex w-3/4 h-2/3 justify-between">
            {Object.keys(boardTitles).map((title, index) => (
                <Board
                    key={index}
                    title={title}
                    titles={boardTitles}
                    setTasks={setTasks}
                    reorderTasks={reorderTasks}
                    boardTasks={tasks.filter((task) => task.status === boardTitles[title])}
                    onDrop={handleDrop}
                />
            ))}
        </div>
    );
};

export default BoardContainer;
