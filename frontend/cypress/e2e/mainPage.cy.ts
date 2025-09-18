describe("Main page base tests", () => {
    it("redirects to log in page when unauthenticated", () => {
        cy.visit("/main");
        cy.location("pathname").should("eq", "/login");
        cy.get("form").contains("button", "Log In").should("be.visible");
    });
});

describe("Main page authenticated tests", () => {
    beforeEach(() => {
        cy.visitHome();
        cy.logInAsUser();
    });

    it("shows the expected user tasks", () => {
        cy.get(".tile").should("have.length", 1);
        cy.contains("This is a test task").should("be.visible");
    });

    it("places existing tasks in the correct status board", () => {
        cy.contains(".status-board", "In Progress").within(() => {
            cy.contains(".tile", "This is a test task").and("contain.text", "Aug 1");
        });
    });

    it("adds & persists new tasks correctly", () => {
        cy.get("button[aria-label='Create task']").click();
        cy.get("select[aria-label='Task status']").select("Done");
        cy.get("textarea[aria-label='Task description']").type("This is an added task");
        cy.get("input[aria-label='Task due date']").type("2025-08-02");
        cy.contains("button", "Add").click();

        cy.contains("Task added!").should("be.visible");
        cy.contains(".status-board", "Done").within(() => {
            cy.contains(".tile", "This is an added task").and("contain.text", "Aug 2");
        });

        cy.reload();
        cy.contains(".status-board", "Done").within(() => {
            cy.contains(".tile", "This is an added task").and("contain.text", "Aug 2");
        });
    });

    it("updates & persists task status when edited in the 'edit' modal", () => {
        cy.contains(".tile", "This is an added task").trigger("mousedown").trigger("mouseup");
        cy.get("select[aria-label='Task status']").should("contain.text", "Done");
        cy.get("select[aria-label='Task status']").select("In Progress");
        cy.contains("button", "Save").click();

        cy.contains("Task saved!").should("be.visible");
        cy.contains(".status-board", "In Progress").within(() => {
            cy.contains(".tile", "This is an added task").and("contain.text", "Aug 2");
        });
        cy.reload();
        cy.contains(".status-board", "In Progress").within(() => {
            cy.contains(".tile", "This is an added task").and("contain.text", "Aug 2");
        });
    });

    it("updates & persists task status when it is dragged and dropped on another board", () => {
        cy.contains("This is a test task").trigger("mousedown");
        cy.awaitDragAllowedTrigger();
        cy.contains("This is a test task").trigger("dragstart");
        cy.contains(".status-board", "To Do")
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.awaitDebouncedDbUpdate();

        cy.contains(".status-board", "To Do").within(() => {
            cy.contains(".tile", "This is a test task").and("contain.text", "Aug 1");
        });
        cy.contains(".tile", "This is a test task").trigger("mousedown").trigger("mouseup");
        cy.get("select[aria-label='Task status']").should("contain.text", "To Do");
        cy.reload();
        cy.contains(".status-board", "To Do").within(() => {
            cy.contains(".tile", "This is a test task").and("contain.text", "Aug 1");
        });
    });

    it("deletes task when it is dragged and dropped on the 'delete' button in delete mode & persists deletion", () => {
        cy.get("button[aria-label='Delete task']").click();
        cy.contains(".tile", "This is an added task").trigger("mousedown");
        cy.awaitDragAllowedTrigger();
        cy.contains(".tile", "This is an added task").trigger("dragstart");
        cy.get("button[aria-label='Delete task']")
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.contains("button", "Confirm").click();
        cy.contains(".tile", "This is an added task").should("not.exist");

        cy.reload();
        cy.contains(".tile", "This is an added task").should("not.exist");
    });
});
