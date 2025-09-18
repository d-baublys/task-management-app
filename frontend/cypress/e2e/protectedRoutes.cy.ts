describe("Protected routes", () => {
    it("redirects to log in page when unauthenticated", () => {
        cy.visit("/main");
        cy.location("pathname").should("eq", "/login");
        cy.get("form").contains("button", "Log In").should("be.visible");
    });

    it("redirects to log in page if accessing protected route after logging out", () => {
        cy.logInAsUser();
        cy.contains("In Progress").should("be.visible");
        cy.contains("user1").click();
        cy.contains("Log Out").click();
        cy.contains("Log out successful!").should("be.visible");
        cy.location("pathname").should("eq", "/login");
        cy.get("form").contains("button", "Log In").should("be.visible");
        cy.go("back");
        cy.location("pathname").should("eq", "/login");
        cy.get("form").contains("button", "Log In").should("be.visible");
    });
});
