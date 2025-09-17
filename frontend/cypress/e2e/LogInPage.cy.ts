import { userEmail, userPassword } from "../support/credentials";

describe("Log in page", () => {
    beforeEach(() => {
        cy.visitHome();
        cy.contains("Log In").should("be.visible");
    });

    it("redirects on successful login", () => {
        cy.logInAsUser();

        cy.location("pathname").should("eq", "/main");
        cy.contains("Log in successful!").should("be.visible");
    });

    it("shows error message when provided email is incorrect", () => {
        cy.get("input[aria-label='Email']").type("test@example.com");
        cy.get("input[aria-label='Password']").type(userPassword);
        cy.get("button[type='submit']").click();
        cy.contains(
            "Incorrect email address or password. Please check your credentials and try again."
        ).should("be.visible");
    });

    it("shows error message when provided password is incorrect", () => {
        cy.get("input[aria-label='Email']").type(userEmail);
        cy.get("input[aria-label='Password']").type("password123");
        cy.get("button[type='submit']").click();
        cy.contains(
            "Incorrect email address or password. Please check your credentials and try again."
        ).should("be.visible");
    });

    it("doesn't submit form when any inputs are empty", () => {
        cy.get("input[aria-label='Email']").type(userEmail);
        cy.get("button[type='submit']").click();
        cy.get("input[aria-label='Password']").then(($inputs) => {
            const passwordInput = $inputs[0] as HTMLInputElement;
            cy.wrap(passwordInput.checkValidity()).should("be.false");
        });
        cy.location("pathname").should("eq", "/login");
        cy.get("form").contains("button", "Log In").should("be.visible");
    });

    it("navigates to account creation page on link click", () => {
        cy.contains("a", /Click here to create one/).click();
        cy.location("pathname").should("eq", "/create-account");
        cy.contains("Create Account").should("be.visible");
    });
});
