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
                style={{
                    "--board-btn-spacing": "4rem",
                    "--board-btn-top": "20%",
                    "--modal-width": "600px",
                    "--modal-height": "600px",
                    "--modal-drop-shadow": "0 0 50px rgba(0,0,0,0.25)",
                    "--board-drop-shadow": "0 0 5px rgba(0,0,0,0.25)",
                    "--theme-lightest": "rgb(219 234 254 / 1)",
                    "--theme-lighter": "rgb(173, 201, 239)",
                    "--theme-light": "rgb(131, 195, 232)",
                    "--theme-medium": "rgb(118, 191, 234)",
                    "--theme-dark": "rgb(85, 176, 230)",
                }}
            >
                <BoardContainer />
            </PageTemplate>
        </DndProvider>
    );
}

export default Main;
