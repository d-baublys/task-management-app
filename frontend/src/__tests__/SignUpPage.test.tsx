/* eslint-disable import/first */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpPage from "../pages/SignUpPage";
import React from "react";
import { ContextProvider } from "../context/AppContext";
import { createMockAxiosError } from "../lib/test-factories";

jest.mock("../lib/api-services", () => ({
    signupApi: jest.fn(),
    getTokenApi: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
    useLocation: () => "/create-account",
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

import { signupApi } from "../lib/api-services";

const renderPage = () => {
    render(
        <ContextProvider>
            <SignUpPage />
        </ContextProvider>
    );
};

describe("SignUpPage", () => {
    it("calls the expected APIs on successful sign up & navigates to log in page", async () => {
        renderPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const passwordConfirmInput = screen.getByLabelText("Confirm password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.input(passwordConfirmInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        expect(signupApi).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
            passwordConfirm: "password123",
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    it("shows message on successful sign up", async () => {
        renderPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const passwordConfirmInput = screen.getByLabelText("Confirm password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.input(passwordConfirmInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        expect(signupApi).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
            passwordConfirm: "password123",
        });

        await waitFor(() => {
            expect(screen.getByText("Account created successfully!")).toBeInTheDocument();
        });
    });

    it("shows message on invalid form submission & doesn't navigate to log in page", async () => {
        (signupApi as jest.Mock).mockRejectedValue(
            createMockAxiosError({
                detail: { password2: ["The two password fields didn't match."] },
                status: 401,
            })
        );
        renderPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const passwordConfirmInput = screen.getByLabelText("Confirm password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.input(passwordConfirmInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        await waitFor(() => {
            expect(mockNavigate).not.toHaveBeenCalledWith("/login");
        });

        await waitFor(() => {
            expect(screen.getByText("The two password fields didn't match.")).toBeInTheDocument();
        });
    });

    it("shows custom formatted message when submitting an existing email address", async () => {
        (signupApi as jest.Mock).mockRejectedValue(
            createMockAxiosError({
                detail: { password2: ["Custom user with this Email address already exists."] },
                status: 401,
            })
        );
        renderPage();

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const passwordConfirmInput = screen.getByLabelText("Confirm password");

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.input(passwordConfirmInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByTestId("form-submit-button"));

        await waitFor(() => {
            expect(
                screen.getByText("An account with this email address already exists.")
            ).toBeInTheDocument();
        });
    });
});
