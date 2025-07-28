describe('Comprehensive Item Manager Automation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Complete user journey: Login, Manage Items, Logout', () => {
    // Step 1: Login
    const email = 'test@example.com'
    const password = 'password123'
    
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()
    
    // Verify successful login
    cy.url().should('include', '/')
    cy.contains('Welcome').should('be.visible')
    
    // Step 2: Add multiple items
    const items = [
      { title: 'Laptop', description: 'High-performance laptop' },
      { title: 'Mouse', description: 'Wireless mouse' },
      { title: 'Keyboard', description: 'Mechanical keyboard' }
    ]
    
    items.forEach(item => {
      cy.get('.create-button').click()
      cy.get('input[name="title"]').type(item.title)
      cy.get('textarea[name="description"]').type(item.description)
      cy.get('button[type="submit"]').click()
    })
    
    // Step 3: Verify all items are displayed
    items.forEach(item => {
      cy.contains(item.title).should('be.visible')
      cy.contains(item.description).should('be.visible')
    })
    
    // Step 4: Edit an item
    cy.contains('Mouse').parent().parent().find('.edit-button').click()
    cy.get('input[name="title"]').clear().type('Gaming Mouse')
    cy.get('textarea[name="description"]').clear().type('RGB gaming mouse')
    cy.get('button[type="submit"]').click()
    
    // Verify the edit
    cy.contains('Gaming Mouse').should('be.visible')
    cy.contains('RGB gaming mouse').should('be.visible')
    
    // Step 5: Delete an item
    cy.contains('Keyboard').parent().parent().find('.delete-button').click()
    cy.get('body').then(($body) => {
      if ($body.find('.delete-button').length) {
        cy.on('window:confirm', () => true)
      }
    })
    cy.contains('Keyboard').should('not.exist')
    
    // Step 6: Logout
    cy.get('.logout-button').click()
    cy.url().should('include', '/login')
  })
})
