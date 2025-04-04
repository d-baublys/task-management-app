import { AxiosResponse } from "axios";

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type BoardTitlesType = { [key: string]: string };

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
    username: string;
    password: string;
    rememberMe: boolean;
}

export type AddUpdateResponse = Promise<AxiosResponse<TaskType> | undefined>;
export type AddUpdateMultiResponse = Promise<(AxiosResponse<TaskType> | undefined)[] | undefined>;
export type GeneralApiResponse<T> = Promise<AxiosResponse<T> | undefined>;
