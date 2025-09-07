import { AxiosError, AxiosResponse } from "axios";

export const createAxiosResponse = <T,>(data: T, status = 200): AxiosResponse<T> => {
    return {
        data,
        status,
        statusText: "OK",
        headers: {},
        config: {} as any,
        request: {},
    };
};

export const createAxiosError = <T = { detail: string },>(
    data: T,
    status: number,
    message: string = ""
): AxiosError<T> => {
    return new AxiosError(message, undefined, undefined, undefined, {
        status,
        data,
        headers: {},
        config: {} as any,
        statusText: "",
    });
};
