describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display login page by default', () => {
    cy.url().should('include', '/login')
    cy.get('[data-testid="email-input"]').should('be.visible')
    cy.get('[data-testid="password-input"]').should('be.visible')
    cy.get('[data-testid="login-button"]').should('be.visible')
  })

  it('should login with valid credentials', () => {
    const email = 'test@example.com'
    const password = 'password123'
    
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="login-button"]').click()
    
    // Should redirect to home page after successful login
    cy.url().should('include', '/home')
    cy.contains('Welcome').should('be.visible')
  })

  it('should logout successfully', () => {
    // First login
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('[data-testid="password-input"]').type('password123')
    cy.get('[data-testid="login-button"]').click()
    
    // Then logout
    cy.get('[data-testid="logout-button"]').click()
    
    // Should redirect to login page
    cy.url().should('include', '/login')
    cy.get('[data-testid="email-input"]').should('be.visible')
  })
})
