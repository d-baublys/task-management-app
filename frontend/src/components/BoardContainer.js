import { useState } from "react";
import Board from "./Board";

const BoardContainer = () => {
    const boardTitles = ["To Do", "In Progress", "Done"];
    const [boards, setBoards] = useState({
        [boardTitles[0]]: [{ id: 1 }],
        [boardTitles[1]]: [],
        [boardTitles[2]]: [],
    });

    const handleDrop = (id, targetBoard) => {
        setBoards((prev) => {
            const newBoards = { ...prev };

            for (const board in newBoards) {
                newBoards[board] = newBoards[board].filter((tile) => tile.id !== id);
            }

            newBoards[targetBoard].push({ id });
            return newBoards;
        });
    };

    return (
        <div className="flex w-3/4 h-2/3 justify-between">
            {boardTitles.map((title, index) => (
                <Board
                    key={index}
                    title={title}
                    tiles={boards[title]}
                    onDrop={handleDrop}
                />
            ))}
        </div>
    )
};

export default BoardContainer;
