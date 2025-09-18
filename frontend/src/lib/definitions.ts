import { AxiosResponse } from "axios";

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface TaskPayloadType {
    status: string;
    description: string;
    due_date: string;
    position: number;
}

export interface TaskType extends TaskPayloadType {
    id: number;
    user?: number;
}

export interface AddTaskParams {
    status: string;
    description: string;
    dueDate: string;
}

export interface SaveTaskParams extends AddTaskParams {
    task?: TaskType;
}

export interface DndTileParams extends AddTaskParams {
    id: number;
}

export interface DndTileData extends DndTileParams {
    tileWidth: number;
}

export interface UpdateTaskParams {
    task: TaskType;
    status?: string;
    description?: string;
    dueDate?: string;
    index?: number;
}

export interface LoginParams {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface SignUpParams {
    email: string;
    password: string;
    passwordConfirm: string;
}

interface FakeAxiosResponse {
    data: { detail: string | Record<string, string[]> };
    status: number;
}

export class FakeAxiosError extends Error {
    response: FakeAxiosResponse;

    constructor(response: FakeAxiosResponse, message?: string) {
        super(message);
        this.name = "FakeAxiosError";
        this.response = response;
    }
}

export type FormVariants = "logIn" | "signUp";

export const boardsData = {
    "To Do": "to_do",
    "In Progress": "in_progress",
    Done: "done",
} as const;

export type BoardLabels = keyof typeof boardsData;
export type BoardCodes = (typeof boardsData)[BoardLabels];

export type AddUpdateResponse = Promise<AxiosResponse<TaskType> | undefined>;
export type AddUpdateMultiResponse = Promise<(AxiosResponse<TaskType> | undefined)[] | undefined>;
export type GeneralApiResponse<T> = Promise<AxiosResponse<T> | undefined>;
