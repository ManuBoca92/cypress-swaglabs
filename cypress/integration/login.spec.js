/// <reference types="cypress" />
import LoginPage from '../pageObjects/LoginPage'
const userData = require('../fixtures/user.json')

describe('User login tests', function () {
  beforeEach('Visits saucedemo website.', function () {
    cy.visit('/index.html')
  })
  userData.forEach((data) => {
    it(`Login with ${data.credential}`, function () {
      LoginPage.fillForm(data.username, data.password).submitForm()
      cy.url().should('includes', data.url)
      if (data.errorMessage) {
        cy.get('[data-test="error"]').should('be.visible')
      }
    })
  })
  it('Login with blank username and password', () => {
    LoginPage.submitForm()
    cy.get('[data-test="error"]').should('be.visible')
  })
})
