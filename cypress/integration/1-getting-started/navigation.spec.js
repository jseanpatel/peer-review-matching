describe("Navigation", () => {
  it("should navigate to the index", () => {

    // Start from the index page
    cy.visit("https://peer-review-matching-cqqgibs1m-jseanpatel.vercel.app/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="explore"]').first().click();

    // The new url should include "/about"
    cy.url().should("include", "#explore");

    cy.get('a[href*="live-help"]').first().click();
    cy.url().should("include", "#live-help");

    cy.get('a[href*="about"]').first().click();
    cy.url().should("include", "#about");

    cy.get('a[href*="faq"]').first().click();
    cy.url().should("include", "#faq");

    cy.get('a[href*="sign-in"]').first().click();
    cy.url().should("include", "#sign-in");

    cy.get('a[href*="sign-up"]').first().click();
    cy.url().should("include", "#sign-up");

  });
});
