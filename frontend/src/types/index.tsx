import { AxiosResponse } from "axios";

interface BaseResponseType {
    status: number;
    statusText: string;
    headers: object;
    config: object;
    request?: any;
}

interface GenericResponseType extends BaseResponseType {
    data: object;
}

export interface TaskType {
    id: number;
    status: string;
    description: string;
    due_date: string;
    position: number;
    user: number;
}

export interface TileType {
    id: number;
    status: string;
    description: string;
    dueDate: string;
}

export interface TileItemType extends TileType {
    tileWidth: number;
}

export interface AddUpdateType extends BaseResponseType {
    data: TaskType;
}

export type BoardTitlesType = { [key: string]: string };

export type AddUpdateResponse = Promise<AxiosResponse<AddUpdateType> | undefined>;
export type AddUpdateMultiResponse = Promise<AxiosResponse<AddUpdateType>[] | undefined>;
export type GenericResponse = Promise<AxiosResponse<GenericResponseType> | undefined>;

export interface TaskPayloadType {
    status: string;
    description: string;
    due_date: string;
    position: number;
}

export interface AddTaskParams {
    status: string;
    description: string;
    dueDate: string;
}

export interface SaveTaskParams extends AddTaskParams {
    task?: TaskType;
}

export interface UpdateTaskParams {
    task: TaskType;
    status?: string;
    description?: string;
    dueDate?: string;
    index?: number;
}
