import { AxiosResponse } from "axios";
import { FakeAxiosError, TaskType } from "./definitions";

export function createAxiosResponse<T>(data: T, status = 200): AxiosResponse<T> {
    return {
        data,
        status,
        statusText: "OK",
        headers: {},
        config: {} as any,
        request: {},
    };
}

export function createMockAxiosError({
    detail,
    status,
}: {
    detail: string | Record<string, string[]>;
    status: number;
}): FakeAxiosError {
    return new FakeAxiosError({ data: { detail }, status });
}

export function createFakeTasks(): TaskType[] {
    return [
        {
            id: 3,
            status: "to_do",
            description: "First mocked task",
            due_date: "2025-02-03",
            position: 0,
            user: 1,
        },
        {
            id: 1,
            status: "in_progress",
            description: "Second mocked task",
            due_date: "2025-02-01",
            position: 1,
            user: 1,
        },
        {
            id: 5,
            status: "done",
            description: "Third mocked task",
            due_date: "2025-02-05",
            position: 2,
            user: 1,
        },
    ];
}
