import { userEmail, userPassword } from "../support/credentials";

describe("Log in page", () => {
    it("Logs in correctly", () => {
        cy.visitHome();
        cy.contains("Log In").should("be.visible");

        cy.get("input[aria-label='Email']").type(userEmail);
        cy.get("input[aria-label='Password']").type(userPassword);

        cy.get("button[type='submit']").click();

        cy.location("pathname").should("eq", "/main");
        cy.contains("Log in successful!").should("be.visible");
    });
});
