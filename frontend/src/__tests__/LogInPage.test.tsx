/* eslint-disable import/first */

import { fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import LogInPage from "../pages/LogInPage";
import React, { act, ReactNode } from "react";
import { createMockAxiosError } from "../lib/test-factories";
import useAuth from "../hooks/useAuth";
import { AuthProvider } from "../context/AuthContext";
import { UiProvider } from "../context/UiContext";
import { TasksProvider } from "../context/TasksContext";

jest.mock("../lib/api-services", () => ({
    loginApi: jest.fn(),
    logoutApi: jest.fn(),
    getTokenApi: jest.fn(),
    toggleTokenHeader: jest.fn(),
    getApiTasks: jest.fn(),
    verifyRecaptchaApi: jest.fn(),
}));

jest.mock("react-router", () => ({
    useNavigate: () => jest.fn(),
    useLocation: () => "/login",
    Link: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock("react-google-recaptcha", () => {
    return function ReCaptcha(props: any) {
        return (
            <button onClick={() => props.onChange("mocked-token")} data-testid="mocked-recaptcha">
                Mocked ReCAPTCHA
            </button>
        );
    };
});

import {
    loginApi,
    getTokenApi,
    logoutApi,
    getApiTasks,
    verifyRecaptchaApi,
} from "../lib/api-services";

const renderPassedUnauthenticatedPage = () => {
    render(
        <UiProvider>
            <AuthProvider>
                <TasksProvider>
                    <LogInPage recaptchaRenderOverride={true} />
                </TasksProvider>
            </AuthProvider>
        </UiProvider>
    );
};

const renderNotPassedUnauthenticatedPage = () => {
    render(
        <UiProvider>
            <AuthProvider>
                <TasksProvider>
                    <LogInPage />
                </TasksProvider>
            </AuthProvider>
        </UiProvider>
    );
};

const renderAuthenticatedPage = () => {
    render(
        <UiProvider>
            <AuthProvider overrides={{ isAuthenticated: true, user: "test@example.com" }}>
                <TasksProvider>
                    <LogInPage recaptchaRenderOverride={true} />
                </TasksProvider>
            </AuthProvider>
        </UiProvider>
    );
};

describe("LogInPage", () => {
    it("calls the expected APIs on log in", async () => {
        renderPassedUnauthenticatedPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        expect(loginApi).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
            rememberMe: false,
        });

        expect(getTokenApi).toHaveBeenCalled();
    });

    it("shows message when refresh token is missing on log in", async () => {
        (getTokenApi as jest.Mock).mockRejectedValue(
            createMockAxiosError({
                detail: "No refresh token. Check you have third-party cookies enabled in your browser.",
                status: 401,
            })
        );

        renderPassedUnauthenticatedPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        await waitFor(() => {
            expect(
                screen.getByText(
                    "No refresh token. Check you have third-party cookies enabled in your browser."
                )
            ).toBeInTheDocument();
        });
    });

    it("shows message on successful log in", async () => {
        (loginApi as jest.Mock).mockResolvedValue({
            message: "Log in successful",
            email: "test@example.com",
        });

        (getTokenApi as jest.Mock).mockResolvedValue({ data: { access_token: "fake_token" } });
        (getApiTasks as jest.Mock).mockResolvedValue({ data: [] });

        renderPassedUnauthenticatedPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        expect(screen.getByTestId("toast-notification")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Log in successful!")).toBeInTheDocument();
        });
    });

    it("shows message when log in fails due to auth error", async () => {
        (loginApi as jest.Mock).mockRejectedValue(
            createMockAxiosError({
                detail: "Incorrect email address or password. Please check your credentials and try again.",
                status: 401,
            })
        );
        renderPassedUnauthenticatedPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        await waitFor(() => {
            expect(
                screen.getByText(
                    "Incorrect email address or password. Please check your credentials and try again."
                )
            ).toBeInTheDocument();
        });
    });

    it("shows message when log in due to server error", async () => {
        (loginApi as jest.Mock).mockRejectedValue(
            createMockAxiosError({
                detail: "Server error.",
                status: 500,
            })
        );
        renderPassedUnauthenticatedPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        expect(screen.getByTestId("toast-notification")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Error logging in!")).toBeInTheDocument();
        });
    });

    it("logs out after refresh token expiry", async () => {
        (getTokenApi as jest.Mock).mockRejectedValue(
            createMockAxiosError({ detail: "Invalid token", status: 401 })
        );

        const showToast = jest.fn();

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <UiProvider overrides={{ showToast }}>{children}</UiProvider>
        );

        const { result } = renderHook(
            () =>
                useAuth({
                    isAuthenticated: true,
                    setIsAuthenticated: jest.fn(),
                    setUser: jest.fn(),
                }),
            { wrapper }
        );

        renderAuthenticatedPage();

        expect(getTokenApi).toHaveBeenCalled();

        await act(async () => {
            await result.current.monitorAccess();
        });

        expect(getTokenApi).toHaveBeenCalled();
        expect(logoutApi).toHaveBeenCalled();

        expect(screen.getByTestId("toast-notification")).toBeInTheDocument();
        expect(showToast).toHaveBeenCalledWith("failure", "You have been logged out!");
    });

    it("calls the expected APIs on log out", async () => {
        renderAuthenticatedPage();

        const navActionButton = screen.getByTestId("nav-action-button");

        expect(navActionButton).toBeInTheDocument();
        fireEvent.click(navActionButton);

        expect(screen.getByText("Log Out")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Log Out"));

        expect(logoutApi).toHaveBeenCalled();
    });

    it("shows message on successful log out", async () => {
        renderAuthenticatedPage();

        const navActionButton = screen.getByTestId("nav-action-button");

        expect(navActionButton).toBeInTheDocument();
        fireEvent.click(navActionButton);

        expect(screen.getByText("Log Out")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Log Out"));

        expect(screen.getByTestId("toast-notification")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Log out successful!")).toBeInTheDocument();
        });
    });

    it("shows message when log out fails", async () => {
        (logoutApi as jest.Mock).mockRejectedValue({
            detail: "Server error.",
        });
        renderAuthenticatedPage();

        const navActionButton = screen.getByTestId("nav-action-button");

        expect(navActionButton).toBeInTheDocument();
        fireEvent.click(navActionButton);

        expect(screen.getByText("Log Out")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Log Out"));

        expect(screen.getByTestId("toast-notification")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Error logging out!")).toBeInTheDocument();
        });
    });

    it("calls the expected API on reCAPTCHA click", async () => {
        (loginApi as jest.Mock).mockResolvedValue({
            message: "Log in successful",
            email: "test@example.com",
        });

        (getTokenApi as jest.Mock).mockResolvedValue({ data: { access_token: "fake_token" } });

        renderNotPassedUnauthenticatedPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        await waitFor(() => {
            expect(screen.getByTestId("mocked-recaptcha")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId("mocked-recaptcha"));

        expect(verifyRecaptchaApi).toHaveBeenCalled();
        await waitFor(() => {
            expect(loginApi).toHaveBeenCalled();
        });
    });

    it("shows message on reCAPTCHA verification failure", async () => {
        (verifyRecaptchaApi as jest.Mock).mockRejectedValue(
            createMockAxiosError({ detail: "reCAPTCHA not verified.", status: 403 })
        );

        renderNotPassedUnauthenticatedPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        await waitFor(() => {
            expect(screen.getByTestId("mocked-recaptcha")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId("mocked-recaptcha"));

        expect(verifyRecaptchaApi).toHaveBeenCalled();
        await waitFor(() => {
            expect(screen.getByText("reCAPTCHA not verified.")).toBeInTheDocument();
        });
    });

    it("shows message on reCAPTCHA server failure", async () => {
        (verifyRecaptchaApi as jest.Mock).mockRejectedValue(
            createMockAxiosError({ detail: "Server error.", status: 500 })
        );

        renderNotPassedUnauthenticatedPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        await waitFor(() => {
            expect(screen.getByTestId("mocked-recaptcha")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId("mocked-recaptcha"));

        expect(verifyRecaptchaApi).toHaveBeenCalled();
        await waitFor(() => {
            expect(screen.getByText("reCAPTCHA error!")).toBeInTheDocument();
        });
    });
});
