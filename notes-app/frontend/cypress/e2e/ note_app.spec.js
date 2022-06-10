describe('Note app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Yong Qin',
      username: 'qin',
      password: 'yongqin'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('login fails with wrong password', function(){
    cy.contains('login').click()
    cy.get('input:first').type('qin')
    cy.get('input:last').type('jeineonfo')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')
                    .and('have.css', 'color', 'rgb(255, 0, 0)')
                    .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Yong Qin logged in')
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
    cy.get('input:first').type('qin')
    cy.get('input:last').type('yongqin')
    cy.get('#login-button').click()

    cy.contains('Yong Qin logged in')
  }) 
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'qin', password: 'yongqin' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function(){
      beforeEach(function(){
        cy.createNote({
          content: 'another note cypress',
          important:false
        })
      })


      it('it can be made important', function(){
        cy.contains('another note cypress')
          .contains('make important')
          .click()
        
        cy.contains('another note cypress')
          .contains('make not important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
  
      it('one of those can be made important', function () {
        cy.contains('second note')
          .contains('make important')
          .click()
  
        cy.contains('second note')
          .contains('make not important')
      })
    })
  })
})