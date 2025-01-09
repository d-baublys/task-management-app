import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardContainer from "./components/BoardContainer";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-center items-center w-full h-lvh">
                <BoardContainer />
            </div>
        </DndProvider>
    );
}

export default App;
