import selectors from "../fixtures/selectors";

describe("main page", () => {
  it("Main page opens, 7 days of the week display", () => {
    cy.visit("/");
    cy.contains("Идёмвкино").should("be.visible");
    selectors.forEach((selector) => {
      cy.get(selector.weekday).should("have.length", 7);
    });
  });
});