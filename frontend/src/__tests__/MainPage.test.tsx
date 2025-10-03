/* eslint-disable import/first */

import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Main from "../pages/Main";
import { createAxiosResponse, createFakeTasks, createMockAxiosError } from "../lib/test-factories";
import { ContextProvider, ContextType } from "../context/AppContext";
import { AddTaskParams, TaskType } from "../lib/definitions";

jest.mock("react-device-detect", () => ({
    isMobile: false,
}));

jest.mock("../lib/api-services", () => ({
    createApiTask: jest.fn(),
    getApiTasks: jest.fn(),
    updateApiTask: jest.fn(),
    deleteApiTask: jest.fn(),
}));

jest.mock("react-router", () => ({
    useNavigate: () => jest.fn(),
}));

import { createApiTask, deleteApiTask, getApiTasks, updateApiTask } from "../lib/api-services";

const renderMainPage = ({ overrides }: { overrides?: Partial<ContextType> } = {}) =>
    render(
        <ContextProvider
            overrides={{
                isAuthenticated: true,
                user: "test@example.com",
                dragAllowed: true,
                ...overrides,
            }}
        >
            <Main />
        </ContextProvider>
    );

const renderWithEditModalOpen = async () => {
    renderMainPage({
        overrides: {
            dragAllowed: false,
            activeTaskId: 3,
        },
    });

    await waitFor(() => {
        expect(screen.getByText("First mocked task")).toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByText("First mocked task"));
    fireEvent.mouseUp(screen.getByText("First mocked task"));
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
};

const renderWithAddModalOpen = () => {
    renderMainPage();

    fireEvent.click(screen.getByLabelText("Create task"));
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
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

    it("calls API correctly on successful task update", async () => {
        const initialTasks: TaskType[] = createFakeTasks();
        const updatedTask: TaskType = {
            ...initialTasks[0],
            description: "Updated first mocked task",
        };

        (getApiTasks as jest.Mock).mockResolvedValue(createAxiosResponse(initialTasks, 200));
        (updateApiTask as jest.Mock).mockResolvedValue(createAxiosResponse(updatedTask, 200));
        await renderWithEditModalOpen();

        await waitFor(() => {
            expect(screen.getByRole("textbox", { name: "Task description" })).toBeInTheDocument();
        });

        fireEvent.input(screen.getByRole("textbox", { name: "Task description" }), {
            target: { value: "Updated first mocked task" },
        });

        fireEvent.click(screen.getByRole("button", { name: "Save" }));

        expect(updateApiTask).toHaveBeenCalledWith(3, {
            status: "to_do",
            description: "Updated first mocked task",
            due_date: "2025-02-03",
            position: 0,
        });
    });

    it("shows message on task update server error", async () => {
        const initialTasks: TaskType[] = createFakeTasks();

        (getApiTasks as jest.Mock).mockResolvedValue(createAxiosResponse(initialTasks, 200));
        (updateApiTask as jest.Mock).mockRejectedValue(
            createMockAxiosError({ detail: "Error updating task!", status: 500 })
        );
        await renderWithEditModalOpen();

        await waitFor(() => {
            expect(screen.getByRole("textbox", { name: "Task description" })).toBeInTheDocument();
        });

        fireEvent.input(screen.getByRole("textbox", { name: "Task description" }), {
            target: { value: "Updated first mocked task" },
        });

        fireEvent.click(screen.getByRole("button", { name: "Save" }));

        expect(updateApiTask).toHaveBeenCalledWith(3, {
            status: "to_do",
            description: "Updated first mocked task",
            due_date: "2025-02-03",
            position: 0,
        });

        await waitFor(() => {
            expect(screen.getByText("Error updating task!")).toBeInTheDocument();
        });
    });

    it("calls API on successful task creation", async () => {
        const task: TaskType = createFakeTasks()[0];
        const { id, user, position, ...rest } = task;
        const taskPayload: AddTaskParams = { ...rest, dueDate: rest.due_date };

        (createApiTask as jest.Mock).mockResolvedValue(createAxiosResponse(taskPayload, 201));
        renderWithAddModalOpen();

        fireEvent.change(screen.getByRole("combobox", { name: "Task status" }), {
            target: { value: "to_do" },
        });

        fireEvent.input(screen.getByRole("textbox", { name: "Task description" }), {
            target: { value: "First mocked task" },
        });

        fireEvent.change(screen.getByLabelText("Task due date"), {
            target: { value: "2025-02-03" },
        });

        fireEvent.click(screen.getByRole("button", { name: "Add" }));

        expect(createApiTask).toHaveBeenCalledWith({
            status: "to_do",
            description: "First mocked task",
            dueDate: "2025-02-03",
        });

        await waitFor(() => {
            expect(screen.getByText("Task added!")).toBeInTheDocument();
        });
    });

    it("shows message on task creation server failure", async () => {
        (createApiTask as jest.Mock).mockRejectedValue(
            createMockAxiosError({ detail: "Error adding task!", status: 500 })
        );
        renderWithAddModalOpen();

        fireEvent.change(screen.getByRole("combobox", { name: "Task status" }), {
            target: { value: "to_do" },
        });

        fireEvent.input(screen.getByRole("textbox", { name: "Task description" }), {
            target: { value: "First mocked task" },
        });

        fireEvent.change(screen.getByLabelText("Task due date"), {
            target: { value: "2025-02-03" },
        });

        fireEvent.click(screen.getByRole("button", { name: "Add" }));

        expect(createApiTask).toHaveBeenCalledWith({
            status: "to_do",
            description: "First mocked task",
            dueDate: "2025-02-03",
        });

        await waitFor(() => {
            expect(screen.getByText("Error adding task!")).toBeInTheDocument();
        });
    });

    it("calls API on successful task deletion", async () => {
        const tasks: TaskType[] = createFakeTasks();

        (getApiTasks as jest.Mock).mockResolvedValue(createAxiosResponse(tasks, 200));

        renderMainPage();

        await waitFor(() => {
            expect(screen.getByText("First mocked task")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByLabelText("Delete task"));
        fireEvent.dragStart(screen.getByText("First mocked task"));
        fireEvent.dragEnter(screen.getByLabelText("Delete task"));
        fireEvent.dragOver(screen.getByLabelText("Delete task"));
        fireEvent.drop(screen.getByLabelText("Delete task"));

        await waitFor(() => {
            expect(
                screen.getByText("Are you sure you want to delete this task?")
            ).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

        await waitFor(() => {
            expect(deleteApiTask).toHaveBeenCalledWith(3);
        });
    });

    it("shows message on task deletion server failure", async () => {
        const tasks: TaskType[] = createFakeTasks();

        (deleteApiTask as jest.Mock).mockRejectedValue(
            createMockAxiosError({ detail: "Error deleting task!", status: 500 })
        );

        (getApiTasks as jest.Mock).mockResolvedValue(createAxiosResponse(tasks, 200));

        renderMainPage();

        await waitFor(() => {
            expect(screen.getByText("First mocked task")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByLabelText("Delete task"));
        fireEvent.dragStart(screen.getByText("First mocked task"));
        fireEvent.dragEnter(screen.getByLabelText("Delete task"));
        fireEvent.dragOver(screen.getByLabelText("Delete task"));
        fireEvent.drop(screen.getByLabelText("Delete task"));

        await waitFor(() => {
            expect(
                screen.getByText("Are you sure you want to delete this task?")
            ).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

        await waitFor(() => {
            expect(screen.getByText("Error deleting task!")).toBeInTheDocument();
        });
    });
});
