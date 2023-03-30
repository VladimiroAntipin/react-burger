// Burger ingredient test //
import { cartList } from "../fixtures/constants";
import { closeButton } from "../fixtures/constants";

describe("ingredient list is loaded and fully working", function () {
  beforeEach(function () {
    cy.intercept("GET", "/api/ingredients", { fixture: "ingredients" });
    cy.visit('/');
  });

  it("drag-n-drop ingredient", function () {
    cy.get(
      '[data-test="ingredients__listCard_60d3b41abdacab0026a733c6"]'
    ).trigger("dragstart");
    cy.get(cartList).trigger("drop");
  });

  it("open and close modal with ingredient", function () {
    cy.get('[data-test="burgerIngredient_60d3b41abdacab0026a733c6"]').click()
    cy.get('[data-test="modal__titleContainer"]')
      .contains("Детали ингредиента")
      .should("exist");
    cy.get(closeButton).click()
  });
});
