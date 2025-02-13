import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import useHandleClicks from "../hooks/useHandleClicks";

import BoardContainer from "../components/BoardContainer";
import DragLayer from "../components/DragLayer";
import PageTemplate from "../components/PageTemplate";
import LeftColumn from "../components/LeftColumn";
import RightColumn from "../components/RightColumn";
import BackdropUnit from "../components/BackdropUnit";

function Main() {
    const test_mobile = false;

    const { taskMouseUp } = useHandleClicks();

    return (
        <DndProvider
            backend={test_mobile ? TouchBackend : HTML5Backend}
            options={{ enableMouseEvents: true }}
        >
            {test_mobile && <DragLayer />}
            <PageTemplate
                leftContent={<LeftColumn />}
                rightContent={<RightColumn />}
                overlayContent={<BackdropUnit />}
                onMouseUp={() => taskMouseUp()}
            >
                <BoardContainer />
            </PageTemplate>
        </DndProvider>
    );
}

export default Main;
