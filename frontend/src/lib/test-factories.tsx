import { AxiosError, AxiosResponse } from "axios";
import { FakeAxiosError } from "./definitions";

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

export const createMockAxiosError = ({ detail, status }: { detail: string; status: number }) => {
    return new FakeAxiosError({ data: { detail }, status });
};
