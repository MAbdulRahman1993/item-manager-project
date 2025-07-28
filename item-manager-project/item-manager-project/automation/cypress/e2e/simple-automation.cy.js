describe('Simple Item Manager Automation', () => {
  it('Should login successfully', () => {
    cy.visit('http://localhost:3000/login')
    
    // Check if login form is visible
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
    
    // Login
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    // Verify successful login
    cy.url().should('include', '/')
    cy.contains('Welcome').should('be.visible')
    cy.contains('Item Manager').should('be.visible')
  })

  it('Should show login form on homepage when not authenticated', () => {
    cy.visit('http://localhost:3000')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
  })

  it('Should navigate to register page', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('a[href="/register"]').click()
    cy.url().should('include', '/register')
  })
})
