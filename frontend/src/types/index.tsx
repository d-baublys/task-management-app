import { AxiosResponse } from "axios";

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

export interface BaseResponseType {
    status: number;
    statusText: string;
    headers: object;
    config: object;
    request?: any;
}

export interface GenericResponseType extends BaseResponseType {
    data: object;
}

export interface AddUpdateType extends BaseResponseType {
    data: TaskType;
}

export type BoardTitlesType = { [key: string]: string };

export type AddUpdateResponse = Promise<AxiosResponse<TaskType>>;
export type AddUpdateMultiResponse = Promise<AxiosResponse<TaskType[]>>;
export type GenericResponse = Promise<AxiosResponse<GenericResponseType>>;
