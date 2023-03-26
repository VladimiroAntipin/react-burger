// Burger ingredient test //

describe("ingredient list is loaded and fully working", function () {
  beforeEach(function () {
    cy.intercept("GET", "/api/ingredients", {
      fixture: "ingredients",
    });
    cy.visit("http://localhost:3000");
  });

  it("drag-n-drop ingredient", function () {
    cy.get(
      '[data-test="ingredients__listCard_60d3b41abdacab0026a733c6"]'
    ).trigger("dragstart");
    cy.get('[data-test="cart__listIngredients"]').trigger("drop");
  });

  it("open modal with ingredient", function () {
    cy.get('[data-test="modal__titleContainer"]')
      .contains("Детали ингредиента")
      .should("exist");
      cy.visit('http://localhost:3000/ingredients/60d3b41abdacab0026a733c6')
  });

  it("close modal with ingredient", function () {
    cy.get('[data-test="closebutton"]')
      cy.visit("http://localhost:3000");
  });
});
