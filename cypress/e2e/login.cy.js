import admins from "../fixtures/admins";
import selectors from "../fixtures/selectors";

describe("login page", () => {
  beforeEach(() => {
    cy.visit('/admin')
  })

  it("login admin", () => {
    admins.forEach((admin) => {
      cy.login(admin.login, admin.password);
      cy.contains("Управление залами").should("be.visible");
    });
  });

  it("fails to login with empty login", () => {
    admins.forEach((admin) => {
      cy.login(null, admin.password);
    });
    selectors.forEach((selector) => {
      cy.checkValidation(selector.emailField);
      cy.checkValidationMessage(selector.emailField, "Заполните это поле.");
    });
  });

  it("fails to login with empty password", () => {
    admins.forEach((admin) => {
      cy.login(admin.login, null);
    });
    selectors.forEach((selector) => {
      cy.checkValidation(selector.passwordField);
      cy.checkValidationMessage(selector.passwordField, "Заполните это поле.");
    });
  });
});