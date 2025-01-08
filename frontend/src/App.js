import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";
import DraggableTile from "./components/DraggableTile";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-center items-center w-full h-lvh">
                <div className="flex w-3/4 h-2/3 justify-between">
                    <Board title={"To Do"} />
                    <Board title={"In Progress"} />
                    <Board title={"Done"} />
                </div>
            </div>
            <DraggableTile />
        </DndProvider>
    );
}

export default App;
