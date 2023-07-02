import admins from "../fixtures/admins";
import selectors from "../fixtures/selectors";
import seats from "../fixtures/seats";

describe("booking ticket", () => {
  it("booking ticket", () => {
    cy.visit("/admin");
    admins.forEach((admin) => {
      cy.login(admin.login, admin.password);
    });

    selectors.forEach((selector) => {
      cy.get(selector.film)
        .eq(0)
        .then(($value) => {
          const nameFilm = $value.text();
          cy.visit("/");
          cy.get(selector.weekday).eq(4).click();
          cy.contains(nameFilm)
            .parents(selector.movie)
            .contains("15:00")
            .click();
        });
      seats.forEach((seat) => {
        cy.get(
          `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
        ).click();
      });
      cy.get(selector.booking_button).click();
      cy.get(selector.booking_code_button).should(
        "have.text",
        "Получить код бронирования"
      );
    });
  });
});