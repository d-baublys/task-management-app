import { useState } from "react";

const AddTaskMenu = ({ onAdd, boardTitles }) => {
    const [newTask, setNewTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTask) return;

        onAdd(boardTitles[newTask]);
        setNewTask("");
    };

    return (
        <div className="flex flex-col justify-center items-center w-[500px] h-[250px] rounded-xl bg-slate-500">
            <div className="w-3/4 h-1/3">
                <form
                    className="flex flex-col justify-between items-center h-full"
                    onSubmit={handleSubmit}
                >
                    <select
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="w-full h-8"
                    >
                        <option value="" disabled>

                        </option>
                        {Object.keys(boardTitles).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="rounded-xl w-1/3 h-8 bg-white">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskMenu;
