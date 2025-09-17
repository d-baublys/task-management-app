import { userEmail } from "../support/credentials";

describe("Create account page base tests", () => {
    beforeEach(() => {
        cy.visit("/create-account");
        cy.location("pathname").should("eq", "/create-account");
    });

    it("shows error message when provided passwords do not match", () => {
        cy.get("input[aria-label='Email']").type("test@example.com");
        cy.get("input[aria-label='Password']").type("password123");
        cy.get("input[aria-label='Confirm password']").type("password1234");
        cy.get("button[type='submit']").click();
        cy.contains("The two password fields didn’t match.").should("be.visible");
    });

    it("shows validation error message when provided email is invalid", () => {
        cy.get("input[aria-label='Email']").type("testexample.com");
        cy.get("input[aria-label='Password']").type("password123");
        cy.get("input[aria-label='Confirm password']").type("password123");
        cy.get("button[type='submit']").click();
        cy.get("input[aria-label='Email']").then(($inputs) => {
            const passwordInput = $inputs[0] as HTMLInputElement;
            cy.wrap(passwordInput.validationMessage).should("eq", "Please enter an email address.");
        });
        cy.location("pathname").should("eq", "/create-account");
        cy.contains("button", "Create Account").should("be.visible");
    });

    it("shows error message when provided email is already used", () => {
        cy.get("input[aria-label='Email']").type(userEmail);
        cy.get("input[aria-label='Password']").type("password1");
        cy.get("input[aria-label='Confirm password']").type("password1");
        cy.get("button[type='submit']").click();
        cy.contains("An account with this email address already exists.").should("be.visible");
    });

    it("shows error message when password is too short ", () => {
        cy.get("input[aria-label='Email']").type("test@example.com");
        cy.get("input[aria-label='Password']").type("123");
        cy.get("input[aria-label='Confirm password']").type("123");
        cy.get("button[type='submit']").click();
        cy.contains("This password is too short. It must contain at least 8 characters.").should(
            "be.visible"
        );
    });
});

describe("Create account page seeded tests", () => {
    before(() => {
        cy.visit("/create-account");
        cy.location("pathname").should("eq", "/create-account");
    });

    after(() => {
        cy.exec("npm run db-reset");
    });

    it("shows toast notification and redirects to login page on successful account creation", () => {
        cy.get("input[aria-label='Email']").type("test@example.com");
        cy.get("input[aria-label='Password']").type("password123,./");
        cy.get("input[aria-label='Confirm password']").type("password123,./");
        cy.get("button[type='submit']").click();
        cy.contains("Account created successfully!").should("be.visible");
        cy.get("form").contains("button", "Log In").should("be.visible");
    });
});
