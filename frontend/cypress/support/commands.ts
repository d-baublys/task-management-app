/// <reference types="cypress" />

import { userEmail, userPassword } from "./credentials";

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
            logInAsUser(): Chainable<void>;
            awaitDragAllowedTrigger(): Chainable<void>;
            awaitDebouncedDbUpdate(): Chainable<void>;
        }
    }
}

Cypress.Commands.add("visitHome", () => {
    cy.visit("/");
});

Cypress.Commands.add("logInAsUser", () => {
    cy.visitHome();

    cy.get("input[aria-label='Email']").type(userEmail);
    cy.get("input[aria-label='Password']").type(userPassword);
    cy.get("button[type='submit']").click();
});

Cypress.Commands.add("awaitDragAllowedTrigger", () => {
    cy.wait(200); // account for 'drag allowed' timeout
});

Cypress.Commands.add("awaitDebouncedDbUpdate", () => {
    cy.wait(400); // account for debounced db update on drop
});
