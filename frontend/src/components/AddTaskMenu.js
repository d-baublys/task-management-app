import { useState } from "react";

const AddTaskMenu = ({ onAdd, boardTitles, setShowAddPrompt }) => {
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!status || !description || !dueDate) return;

        onAdd(boardTitles[status], description, dueDate);
        setStatus("");
        setDescription("");
        setDueDate(null);
        setShowAddPrompt((prev) => !prev);
    };

    return (
        <div
            className={`add-menu sticky flex flex-col justify-center items-center rounded-xl bg-slate-500 z-[600]`}
            style={{
                top: "calc(var(--board-btn-top) + var(--board-btn-spacing))",
                width: "var(--add-menu-width)",
                height: "var(--add-menu-height)",
            }}
        >
            <div className="w-3/4 h-2/3">
                <form
                    className="flex flex-col justify-between items-center h-full"
                    onSubmit={handleSubmit}
                >
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full h-8 px-2 rounded-md"
                    >
                        <option value="" disabled hidden>
                            Select task status...
                        </option>
                        {Object.keys(boardTitles).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-8 px-2 rounded-md"
                        placeholder="Enter task description..."
                    />
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    <button type="submit" className="rounded-xl w-1/3 h-8 bg-white">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskMenu;
