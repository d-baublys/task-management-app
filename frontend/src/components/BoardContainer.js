import Board from "./Board";

const BoardContainer = ({ tasks, setTasks, updateTask, updateTasks, boardTitles }) => {
    return (
        <div className="flex w-3/4 h-2/3 justify-between">
            {Object.keys(boardTitles).map((title, index) => (
                <Board
                    key={index}
                    title={title}
                    titles={boardTitles}
                    setTasks={setTasks}
                    updateTask={updateTask}
                    updateTasks={updateTasks}
                    boardTasks={tasks.filter((task) => task.status === boardTitles[title])}
                />
            ))}
        </div>
    );
};

export default BoardContainer;
