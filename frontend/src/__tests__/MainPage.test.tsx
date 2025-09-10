/* eslint-disable import/first */

import React, { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Main from "../pages/Main";
import { getApiTasks } from "../lib/api-services";
import { createAxiosResponse, createFakeTasks, createMockAxiosError } from "../lib/test-factories";
import { ContextProvider } from "../context/AppContext";

jest.mock("react-dnd", () => ({
    DndProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    useDrag: () => [{}, jest.fn(), jest.fn()],
    useDrop: () => [{}, jest.fn()],
}));
jest.mock("react-dnd-html5-backend", () => ({
    HTML5Backend: jest.fn(),
}));
jest.mock("react-dnd-touch-backend", () => ({
    TouchBackend: jest.fn(),
}));
jest.mock("react-device-detect", () => ({
    isMobile: jest.fn(),
}));

jest.mock("../lib/api-services", () => ({
    getApiTasks: jest.fn(),
}));

jest.mock("axios", () => ({
    create: jest.fn(() => ({
        get: jest.fn(),
        post: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    })),
    AxiosError: jest.fn(),
}));

jest.mock("react-router", () => ({
    useNavigate: () => jest.fn(),
    useLocation: () => "/login",
    Link: jest.fn(),
}));

jest.mock("../components/DragLayer");

const renderMainPage = () => {
    render(
        <ContextProvider overrides={{ isAuthenticated: true, user: "test@example.com" }}>
            <Main />
        </ContextProvider>
    );
};

describe("MainPage", () => {
    it("displays tasks on successful fetch", async () => {
        (getApiTasks as jest.Mock).mockResolvedValue(createAxiosResponse(createFakeTasks(), 200));
        renderMainPage();

        await waitFor(() => {
            expect(screen.getByText("First mocked task")).toBeInTheDocument();
        });

        expect(screen.getByText("Second mocked task")).toBeInTheDocument();
        expect(screen.getByText("Third mocked task")).toBeInTheDocument();
    });

    it("displays error message on failed task fetch", async () => {
        (getApiTasks as jest.Mock).mockRejectedValue(
            createMockAxiosError({ detail: "Error fetching task data!", status: 500 })
        );
        renderMainPage();

        await waitFor(() => {
            expect(screen.getByText("Error fetching task data!")).toBeInTheDocument();
        });
    });
});
