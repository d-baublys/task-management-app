import useAppContext from "../context/AppContext";
import { StateSetter } from "../lib/definitions";

let timer: ReturnType<typeof setTimeout> | undefined = undefined;

const useHandleClicks = (editStateSetter?: StateSetter<boolean>) => {
    const { dragAllowed, setDragAllowed, activeTaskId, setActiveTaskId, isDeleteMode } =
        useAppContext();

    const taskMouseDown = (id: number) => {
        setActiveTaskId(id);
        isDeleteMode ? setDragAllowed(true) : (timer = setTimeout(() => setDragAllowed(true), 100));
    };

    const taskMouseUp = () => {
        if (!editStateSetter) {
            throw new Error("useHandleClicks error: Missing edit state setter");
        }

        if (!dragAllowed && activeTaskId !== null && timer) {
            editStateSetter(true);
        } else if (dragAllowed) {
            setActiveTaskId(null);
        }
        clearTimeout(timer);
        timer = undefined;
        setDragAllowed(false);
    };
    return { taskMouseDown, taskMouseUp };
};

export default useHandleClicks;
