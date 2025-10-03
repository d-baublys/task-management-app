describe("Main page base tests", () => {
    beforeEach(() => {
        cy.visitHome();
        cy.logInAsPrimaryUser();
    });

    it("shows the expected user tasks", () => {
        cy.get(".tile").should("have.length", 3);
        cy.contains("First task").should("be.visible");
        cy.contains("Second task").should("be.visible");
        cy.contains("Third task").should("be.visible");
    });

    it("places existing tasks in the correct status board", () => {
        cy.assertSeededTilesInBoard();
    });

    it("orders tasks correctly based on their 'position' attribute", () => {
        cy.compareTileOrder(["First task", "Second task", "Third task"]);
    });

    it("adds & persists new tasks correctly", () => {
        cy.addNewTask();

        cy.contains("Task added!").should("be.visible");
        cy.assertTaskInBoard("Done", "New task", "Aug 4");

        cy.reload();
        cy.assertTaskInBoard("Done", "New task", "Aug 4");
    });

    it("updates & persists task status when edited in the 'edit' modal", () => {
        cy.contains(".tile", "New task").trigger("mousedown").trigger("mouseup");
        cy.get("select[aria-label='Task status']").should("contain.text", "Done");
        cy.get("select[aria-label='Task status']").select("In Progress");
        cy.contains("button", "Save").click();

        cy.contains("Task saved!").should("be.visible");
        cy.assertTaskInBoard("In Progress", "New task", "Aug 4");
        cy.reload();
        cy.assertTaskInBoard("In Progress", "New task", "Aug 4");
    });

    it("deletes task when it is dragged and dropped on the 'delete' button in delete mode & persists deletion", () => {
        cy.get("button[aria-label='Delete task']").click();
        cy.triggerDrag({ dragTargetHtmlSelector: ".tile", dragTargetTextSelector: "New task" });
        cy.performDrop({ dropTargetHtmlSelector: "button[aria-label='Delete task']" });
        cy.contains("button", "Confirm").click();
        cy.contains(".tile", "New task").should("not.exist");

        cy.reload();
        cy.contains(".tile", "New task").should("not.exist");
    });

    it("updates & persists task status when it is dragged and dropped on another board", () => {
        cy.triggerDrag({ dragTargetTextSelector: "First task" });
        cy.performDrop({
            dropTargetHtmlSelector: ".status-board",
            dropTargetTextSelector: "To Do",
        });
        cy.awaitDebouncedDbUpdate();

        cy.assertTaskInBoard("To Do", "First task", "Aug 1");
        cy.contains(".tile", "First task").trigger("mousedown").trigger("mouseup");
        cy.get("select[aria-label='Task status']").should("contain.text", "To Do");
        cy.reload();
        cy.assertTaskInBoard("To Do", "First task", "Aug 1");
    });
});

describe("Main page tile drag-and-drop interaction tests", () => {
    beforeEach(() => {
        cy.resetDb();
        cy.visitHome();
        cy.logInAsPrimaryUser();
    });

    it("doesn't rearrange tiles when a tile is dropped on the lower half of a tile above it", () => {
        cy.triggerDrag({ dragTargetTextSelector: "Second task" });
        cy.performDrop({ dropTargetTextSelector: "Aug 1" });
        cy.awaitDebouncedDbUpdate();

        cy.compareTileOrder(["First task", "Second task", "Third task"]);
    });

    it("rearranges tiles when a tile is dropped on the upper half of a tile above it & persists changes", () => {
        cy.triggerDrag({ dragTargetTextSelector: "Third task" });
        cy.performDrop({ dropTargetTextSelector: "Second task" });
        cy.awaitDebouncedDbUpdate();

        cy.compareTileOrder(["First task", "Third task", "Second task"]);
        cy.reload();
        cy.compareTileOrder(["First task", "Third task", "Second task"]);
    });

    it("rearranges tiles when a tile is dragged and dropped across multiple tiles & persists changes", () => {
        cy.triggerDrag({ dragTargetTextSelector: "Third task" });
        cy.performDrop({ dropTargetTextSelector: "First task" });
        cy.awaitDebouncedDbUpdate();

        cy.compareTileOrder(["Third task", "First task", "Second task"]);
        cy.reload();
        cy.compareTileOrder(["Third task", "First task", "Second task"]);
    });

    it("appends tile when moved to another board & is dropped below all other tiles", () => {
        cy.viewport(1920, 1080);
        cy.addNewTask();
        cy.triggerDrag({ dragTargetTextSelector: "New task" });
        cy.performDrop({
            dropTargetHtmlSelector: ".status-board",
            dropTargetTextSelector: "In Progress",
        });
        cy.awaitDebouncedDbUpdate();

        cy.assertSeededTilesInBoard();
        cy.assertTaskInBoard("In Progress", "New task", "Aug 4");
        cy.compareTileOrder(["First task", "Second task", "Third task", "New task"]);
    });

    it("rearranges tiles when a tile is moved to another board & is dropped between other tiles", () => {
        cy.addNewTask();
        cy.triggerDrag({ dragTargetTextSelector: "New task" });
        cy.performDrop({ dropTargetTextSelector: "Second task" });
        cy.awaitDebouncedDbUpdate();

        cy.assertSeededTilesInBoard();
        cy.assertTaskInBoard("In Progress", "New task", "Aug 4");
        cy.compareTileOrder(["First task", "New task", "Second task", "Third task"]);
    });
});
