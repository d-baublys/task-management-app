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
    user: number;
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

interface BaseResponseType {
    status: number;
    statusText: string;
    headers: object;
    config: object;
    request?: any;
}

interface AddUpdateType extends BaseResponseType {
    data: TaskType;
}

interface GeneralApiResponseType extends BaseResponseType {
    data: object;
}

export type AddUpdateResponse = Promise<AxiosResponse<AddUpdateType> | undefined>;
export type AddUpdateMultiResponse = Promise<AxiosResponse<AddUpdateType>[] | undefined>;
export type GeneralApiResponse = Promise<AxiosResponse<GeneralApiResponseType> | undefined>;
