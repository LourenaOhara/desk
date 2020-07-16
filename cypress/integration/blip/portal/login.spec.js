/// reference types="cypress" />

import loc from 'C:/Blip_Cypress/cypress/support/locators'
import 'C:/Blip_Cypress/cypress/support/commands'

describe('Login Blip Portal', () => {

    before(() => {
        cy.visit('https://hmg-portal.blip.ai')
      })

    it('Dado que o usuario realiza login na aplicação e a tela do bot selecionado é exibida', () => {
        cy.login('lourena+teste@take.net', '150152')

        cy.wait(10000)
    })
})
