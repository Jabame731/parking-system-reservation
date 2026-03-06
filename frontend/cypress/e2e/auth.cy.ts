describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/auth'); // Adjust route as needed
  });

  describe('Login', () => {
    it('should show validation errors for empty fields', () => {
      // Touch fields to trigger validation
      cy.get('input[name="email"]').focus().blur();
      cy.get('input[name="password"]').focus().blur();

      cy.get('mat-error').should('contain', 'Email is Required');
      cy.get('mat-error').should('contain', 'Password is Required');
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('should successfully switch to Sign Up and back', () => {
      cy.contains('Register').click();
      cy.get('h1').should('contain', 'IoT Based Smart Parking');
      cy.get('app-sign-up').should('exist');

      cy.contains('Log In').click();
      cy.get('app-login').should('exist');
    });

    it('should submit login form when valid', () => {
      cy.intercept('POST', '**/auth/login', { statusCode: 200, body: { token: '123' } }).as(
        'loginReq',
      );

      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');

      cy.get('button[type="submit"]').should('not.be.disabled').click();
      cy.wait('@loginReq');
    });
  });

  describe('Registration', () => {
    beforeEach(() => {
      cy.contains('Register').click();
    });

    it('should validate password matching', () => {
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="address"]').type('123 Smart St');
      cy.get('input[name="contactNumber"]').type('1234567890');
      cy.get('input[name="email"]').type('john@example.com');

      // Enter mismatching passwords
      cy.get('input[name="password"]').type('Password123');
      cy.get('input[name="cPassword"]').type('Password321').blur();

      cy.get('mat-error').should('contain', 'Passwords do not match.');
      cy.get('app-submit-button').contains('Register').should('be.disabled');
    });
  });
});

describe('Authentication Redirects', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/auth');
    // We intercept the login POST request
  });

  it('should navigate Admin to /analytics', () => {
    // Mock Admin Response

    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('123456789');

    cy.get('button').contains('Login').click();

    cy.url().should('include', '/analytics');
  });

  it('should navigate regular User to /dashboard', () => {
    // Mock User Response

    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="password"]').type('123');

    cy.get('button').contains('Login').click();

    cy.url().should('include', '/dashboard');
  });
});
