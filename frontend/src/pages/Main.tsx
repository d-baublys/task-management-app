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
import React, { useEffect } from "react";
import useAppContext from "../context/AppContext";

function Main() {
    const { isAuthenticated, getTasks } = useAppContext();

    useEffect(() => {
        isAuthenticated && getTasks();
    }, [isAuthenticated]);

    const { taskMouseUp } = useHandleClicks();

    return (
        <DndProvider
            backend={isMobile ? TouchBackend : HTML5Backend}
            options={isMobile ? { enableMouseEvents: true } : undefined}
        >
            <DragLayer />
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
