// Burger ingredient test // 

describe('burgerConstructor is fully working', function () {
    beforeEach(() => {
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-refreshToken")
        );
        cy.visit('http://localhost:3000');

    it('drag-n-drop ingredients', function () {
        cy.get('[data-test="burgerConstructorIngredient_60d3b41abdacab0026a733c8"]').trigger('dragstart');
        cy.get('[data-test="cart__listIngredients"]').trigger('drop');
    });

    it('send order', function () {
            cy.get('[data-test="button-order"]').click('postOrder')
        })
    });

    it('open modal with order details', function () {
        cy.get('[data-test="orderDetails__orderNumber"]').contains("123").should("exist");
    });

    it('close modal with order details', function () {
        cy.get('[data-test="closebutton"]')
        cy.visit("http://localhost:3000");
    });

}); 