import Board from "./Board";

const BoardContainer = ({ tasks, setTasks, updateTask, updateMultiTask, boardTitles }) => {
    return (
        <div className="flex w-3/4 h-2/3 justify-between">
            {Object.keys(boardTitles).map((title, index) => (
                <Board
                    key={index}
                    setTasks={setTasks}
                    updateTask={updateTask}
                    updateMultiTask={updateMultiTask}
                    boardTitles={boardTitles}
                    title={title}
                    boardTasks={tasks.filter((task) => task.status === boardTitles[title])}
                />
            ))}
        </div>
    );
};

export default BoardContainer;
