describe('Note app', function() {
  beforeEach(function(){
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, By Yong Qin')
  })

  it('login form can be opened', function(){
    cy.contains('login').click()
  })
  it('user can login', function () {
    cy.contains('login').click()
    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })  
})