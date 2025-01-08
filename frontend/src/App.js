import Board from "./components/Board";

function App() {
    return (
        <div className="flex justify-center items-center w-full h-lvh">
            <div className="flex w-3/4 h-2/3 justify-between">
                <Board title={"To Do"} />
                <Board title={"In Progress"} />
                <Board title={"Done"} />
            </div>
        </div>
    );
}

export default App;
