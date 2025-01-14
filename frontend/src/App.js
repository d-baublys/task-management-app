import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

import BoardContainer from "./components/BoardContainer";
import CreateButton from "./components/CreateButton";
import DeleteButton from "./components/DeleteButton";
import DragLayer from "./components/DragLayer";

function App() {
    const test_mobile = false;
    return (
        <DndProvider
            backend={test_mobile ? TouchBackend : HTML5Backend}
            options={{ enableMouseEvents: true }}
        >
            {test_mobile && <DragLayer />}
            <div className="flex justify-center items-center w-full h-lvh">
                <div className="flex flex-grow justify-center">
                    <div className="h-lvh">
                        <DeleteButton />
                    </div>
                </div>
                <BoardContainer />
                <div className="flex flex-grow justify-center">
                    <div className="h-lvh">
                        <CreateButton />
                    </div>
                </div>
            </div>
            <div className="h-[1500px]"></div>
        </DndProvider>
    );
}

export default App;
