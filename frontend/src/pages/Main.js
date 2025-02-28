import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import useHandleClicks from "../hooks/useHandleClicks";

import BoardContainer from "../components/BoardContainer";
import DragLayer from "../components/DragLayer";
import PageTemplate from "./base/PageTemplate";
import BackdropUnit from "../components/BackdropUnit";
import DeleteButton from "../components/DeleteButton";
import CreateButton from "../components/CreateButton";

function Main() {
    const test_mobile = false;

    const { taskMouseUp } = useHandleClicks();

    return (
        <DndProvider
            backend={test_mobile ? TouchBackend : HTML5Backend}
            options={{ enableMouseEvents: true, pressDelay: 100 }}
        >
            {test_mobile && <DragLayer />}
            <PageTemplate
                leftContent={<DeleteButton />}
                rightContent={<CreateButton />}
                overlayContent={<BackdropUnit />}
                onMouseUp={() => taskMouseUp()}
            >
                <BoardContainer />
            </PageTemplate>
        </DndProvider>
    );
}

export default Main;
