describe("Admin Login Test", () => {
  it("Can open first page", () => {
    cy.visit("/");
    cy.contains("Login");
  });

  // Try register
  it("Goes to Register page", () => {
    cy.get('a[id="signupBtn"]').click();
    cy.url().should('include', '/register');
    cy.get('input[id="usernameInput"]').type("Test");
    cy.get('input[id="emailInput"]').type("andre@carrblad.sv");
    cy.get('input[id="passwordInput"]').type("123456789");
    cy.get('input[id="secondPasswordInput"]').type("12345678");
  });
  it("Can submit the register form", () => {
    cy.get('button[id="submitBtn"]').click();
    cy.contains("Error, Try again!")
  });

  // Try login
  it("Can fill the login form", () => {
    cy.visit("/");
    cy.get('input[id="emailInput"]').type("andre@carrblad.sv");
    cy.get('input[id="passwordInput"]').type("123456789");
  });
  it("Can submit the login form", () => {
    cy.get('button[id="loginBtn"]').click();
    cy.url().should('include', '/admin');
    cy.contains("Admin")
  });
});