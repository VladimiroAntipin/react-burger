// Burger ingredient test // 
import { closeButton } from "../fixtures/constants";
import { cartList } from "../fixtures/constants";

describe('burgerConstructor is fully working', function () {
    beforeEach(() => {
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-refreshToken")
        );
        cy.visit('/');
    });

    it('should add ingredients to the cart send the order', () => {
        cy.get('[class^=BurgerConstructor_cart]').as("constructor");

        cy.get('li').contains('булка R2-D3').trigger("dragstart").trigger("dragleave");
        cy.get(cartList).trigger("drop");

        cy.get('li').contains('Филе Люминесцентного').trigger("dragstart").trigger("dragleave");
        cy.get(cartList).trigger("drop");


        cy.get('li').contains('Говяжий метеорит').trigger("dragstart").trigger("dragleave");
        cy.get(cartList).trigger("drop");

        cy.get('[data-test="button-order"]').click({force: true})
        cy.get('[data-test="orderDetails__orderNumber"]').contains("123").should("exist");
        cy.get(closeButton).click()
    });
}); 