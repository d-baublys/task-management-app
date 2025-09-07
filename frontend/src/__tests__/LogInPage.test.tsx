import { fireEvent, render, screen } from "@testing-library/react";
import LogInPage from "../pages/LogInPage";
import React from "react";

jest.mock("../lib/api-services", () => ({
    loginApi: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

import { loginApi } from "../lib/api-services";

const renderPage = () => render(<LogInPage />);

describe("LogInPage", () => {
    it("calls the API with correct arguments", () => {
        renderPage();

        const emailInput = screen.getByRole("textbox", { name: "email" });
        const passwordInput = screen.getByRole("textbox", { name: "password" });

        fireEvent.input(emailInput, { target: { value: "text@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByRole("button", { name: "Log In" }));

        expect(loginApi).toHaveBeenCalled();
    });
});
