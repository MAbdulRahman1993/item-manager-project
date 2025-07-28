describe('Item Manager Working Demo', () => {
  it('Complete working automation demo', () => {
    // Step 1: Visit the application
    cy.visit('http://localhost:3000')
    
    // Step 2: Verify login form is present
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
    
    // Step 3: Login with test credentials
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    // Step 4: Verify successful login
    cy.url().should('include', '/')
    cy.contains('Welcome').should('be.visible')
    
    // Step 5: Add a new item
    cy.get('button').contains('Add New Item').click()
    cy.get('input[name="title"]').type('Test Item')
    cy.get('textarea[name="description"]').type('This is a test item')
    cy.get('button[type="submit"]').click()
    
    // Step 6: Verify item was created
    cy.contains('Test Item').should('be.visible')
    cy.contains('This is a test item').should('be.visible')
    
    // Step 7: Edit the item
    cy.contains('Test Item').parent().parent().find('button').contains('Edit').click()
    cy.get('input[name="title"]').clear().type('Updated Test Item')
    cy.get('textarea[name="description"]').clear().type('This is an updated test item')
    cy.get('button[type="submit"]').click()
    
    // Step 8: Verify item was updated
    cy.contains('Updated Test Item').should('be.visible')
    cy.contains('This is an updated test item').should('be.visible')
    
    // Step 9: Delete the item
    cy.contains('Updated Test Item').parent().parent().find('button').contains('Delete').click()
    cy.on('window:confirm', () => true)
    
    // Step 10: Verify item was deleted
    cy.contains('Updated Test Item').should('not.exist')
    
    // Step 11: Logout
    cy.get('button').contains('Logout').click()
    cy.url().should('include', '/login')
    
    // Step 12: Verify we're back at login
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
  })
})
