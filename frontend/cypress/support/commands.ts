/// <reference types="cypress" />

import { primaryEmail, primaryPassword, secondaryEmail, secondaryPassword } from "./credentials";
import { BoardLabels } from "../../src/lib/definitions";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export {};

declare global {
    namespace Cypress {
        interface Chainable {
            visitHome(): Chainable<void>;
            logInAsPrimaryUser(): Chainable<void>;
            logInAsSecondaryUser(): Chainable<void>;
            awaitDragAllowedTrigger(): Chainable<void>;
            awaitDebouncedDbUpdate(): Chainable<void>;
            compareTileOrder(tileDescTargetArr: string[]): Chainable<void>;
            addNewTask(): Chainable<void>;
            assertSeededTilesInBoard(): Chainable<void>;
            assertTaskInBoard(
                boardLabel: BoardLabels,
                taskDec: string,
                taskDueDate: string
            ): Chainable<void>;
            triggerDrag(params: {
                dragTargetTextSelector?: string;
                dragTargetHtmlSelector?: string;
            }): Chainable<void>;
            performDrop(params: {
                dropTargetTextSelector?: string;
                dropTargetHtmlSelector?: string;
            }): Chainable<void>;
            resetDb(): Chainable<void>;
        }
    }
}

Cypress.Commands.add("visitHome", () => {
    cy.visit("/");
});

Cypress.Commands.add("logInAsPrimaryUser", () => {
    cy.visitHome();

    cy.get("input[aria-label='Email']").type(primaryEmail);
    cy.get("input[aria-label='Password']").type(primaryPassword);
    cy.get("button[type='submit']").click();
});

Cypress.Commands.add("logInAsSecondaryUser", () => {
    cy.visitHome();

    cy.get("input[aria-label='Email']").type(secondaryEmail);
    cy.get("input[aria-label='Password']").type(secondaryPassword);
    cy.get("button[type='submit']").click();
});

Cypress.Commands.add("awaitDragAllowedTrigger", () => {
    cy.wait(200); // account for 'drag allowed' timeout
});

Cypress.Commands.add("awaitDebouncedDbUpdate", () => {
    cy.wait(400); // account for debounced db update on drop
});

Cypress.Commands.add("compareTileOrder", (tileDescTargetArr) => {
    cy.get(".tile .task-description").then(($tiles) => {
        const taskTextArr = [...$tiles].map((tile) => tile.innerText);

        expect(taskTextArr).to.deep.equal(tileDescTargetArr);
    });
});

Cypress.Commands.add("addNewTask", () => {
    cy.get("button[aria-label='Create task']").click();
    cy.get("select[aria-label='Task status']").select("Done");
    cy.get("textarea[aria-label='Task description']").type("New task");
    cy.get("input[aria-label='Task due date']").type("2025-08-04");
    cy.contains("button", "Add").click();
});

Cypress.Commands.add("assertSeededTilesInBoard", () => {
    cy.contains(".status-board", "In Progress").within(() => {
        cy.contains(".tile", "First task").and("contain.text", "Aug 1");
        cy.contains(".tile", "Second task").and("contain.text", "Aug 2");
        cy.contains(".tile", "Third task").and("contain.text", "Aug 3");
    });
});

Cypress.Commands.add("assertTaskInBoard", (boardLabel, taskDesc, taskDueDate) => {
    cy.contains(".status-board", boardLabel).within(() => {
        cy.contains(".tile", taskDesc).and("contain.text", taskDueDate);
    });
});

Cypress.Commands.add("triggerDrag", ({ dragTargetTextSelector, dragTargetHtmlSelector }) => {
    const startDrag = ($el: JQuery<HTMLElement>) => {
        cy.wrap($el).trigger("dragstart");
    };

    if (dragTargetHtmlSelector && dragTargetTextSelector) {
        cy.get(dragTargetHtmlSelector).contains(dragTargetTextSelector).as("element");
    } else if (dragTargetTextSelector) {
        cy.contains(dragTargetTextSelector).as("element");
    } else if (dragTargetHtmlSelector) {
        cy.get(dragTargetHtmlSelector).as("element");
    } else {
        throw new Error("triggerDrag: no selector provided");
    }

    cy.get("@element").trigger("mousedown");
    cy.awaitDragAllowedTrigger();
    cy.get("@element").then(startDrag);
});

Cypress.Commands.add("performDrop", ({ dropTargetTextSelector, dropTargetHtmlSelector }) => {
    const dropSequence = ($el: JQuery<HTMLElement>) => {
        cy.wrap($el).trigger("dragenter").trigger("dragover").trigger("drop");
    };

    if (dropTargetHtmlSelector && dropTargetTextSelector) {
        cy.get(dropTargetHtmlSelector).contains(dropTargetTextSelector).then(dropSequence);
    } else if (dropTargetTextSelector) {
        cy.contains(dropTargetTextSelector).then(dropSequence);
    } else if (dropTargetHtmlSelector) {
        cy.get(dropTargetHtmlSelector).then(dropSequence);
    } else {
        throw new Error("performDrop: no selector provided");
    }
});

Cypress.Commands.add("resetDb", () => {
    cy.exec("npm run db-reset");
});
