/* eslint-disable import/first */

import { fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import LogInPage from "../pages/LogInPage";
import React, { act } from "react";
import { ContextProvider } from "../context/AppContext";
import { createMockAxiosError } from "../lib/test-factories";
import useAuth from "../hooks/useAuth";

jest.mock("../lib/api-services", () => ({
    ...jest.requireActual("../lib/api-services"),
    loginApi: jest.fn(),
    logoutApi: jest.fn(),
    getTokenApi: jest.fn(),
    toggleTokenHeader: jest.fn(),
    getApiTasks: jest.fn(),
}));

jest.mock("react-router", () => ({
    useNavigate: () => jest.fn(),
    useLocation: () => "/login",
    Link: jest.fn(),
}));

jest.mock("../lib/misc-helpers", () => ({
    ...jest.requireActual("../lib/misc-helpers"),
    handleRecaptcha: jest.fn(),
}));

jest.mock("axios", () => ({
    create: jest.fn(() => ({
        get: jest.fn(),
        post: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    })),
    AxiosError: jest.fn(),
}));

import { loginApi, getTokenApi, logoutApi, getApiTasks } from "../lib/api-services";

const renderUnauthenticatedPage = () => {
    render(
        <ContextProvider overrides={{ isRecaptchaPassed: true }}>
            <LogInPage />
        </ContextProvider>
    );
};

const renderAuthenticatedPage = () => {
    render(
        <ContextProvider
            overrides={{ isRecaptchaPassed: true, isAuthenticated: true, user: "test@example.com" }}
        >
            <LogInPage />
        </ContextProvider>
    );
};

describe("LogInPage", () => {
    it("calls the expected APIs on log in", async () => {
        renderUnauthenticatedPage();

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

        renderUnauthenticatedPage();

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

        renderUnauthenticatedPage();

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
        renderUnauthenticatedPage();

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
        renderUnauthenticatedPage();

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
        const { result } = renderHook(() =>
            useAuth({
                isAuthenticated: true,
                setIsAuthenticated: jest.fn(),
                setUser: jest.fn(),
                setIsDropdownActive: jest.fn(),
                setLoading: jest.fn(),
                showToast,
            })
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
});
