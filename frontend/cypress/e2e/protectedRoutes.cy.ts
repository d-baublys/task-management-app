describe("Protected routes", () => {
    before(() => {
        cy.resetDb();
    });

    it("redirects to log in page when unauthenticated", () => {
        cy.visit("/main");
        cy.location("pathname").should("eq", "/login");
        cy.get("form").contains("button", "Log In").should("be.visible");
    });

    it("redirects to log in page if accessing protected route after logging out", () => {
        cy.logInAsPrimaryUser();
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

    it("segregates user tasks correctly", () => {
        cy.logInAsPrimaryUser();
        cy.get(".tile").should("have.length", 3);

        cy.contains("user1").click();
        cy.contains("Log Out").click();
        cy.contains("Log out successful!").should("be.visible");
        cy.location("pathname").should("eq", "/login");
        cy.get("form").contains("button", "Log In").should("be.visible");

        cy.logInAsSecondaryUser();
        cy.contains("In Progress").should("be.visible");
        cy.get(".tile").should("have.length", 0);
    });
});
