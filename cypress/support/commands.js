import loc from './locators'
import 'cypress-shadow-dom';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200)
    }, 500)
})

Cypress.Commands.add('login', (user, passwd) => {
    cy.get(loc.LOGIN.MESSAGE).should('be.visible')
    cy.get(loc.LOGIN.MESSAGE).should('be.not.empty')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(passwd)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
})

Cypress.Commands.add('selectOpenBot', () =>{
    cy.get(loc.CONTACT_LIST.BOT_LIST).then(()=> console.log('OK'))
    cy.wrap(promise).then(ret => console.log(ret))
    cy.get(loc.CONTACT_LIST.BOT_LIST).should('be.visible')
    cy.xpath(loc.CONTACT_LIST.FN_XP_BTN_BOT('BatBot')).click()
    cy.xpath(loc.CONTACT_LIST.FN_XP_BTN_BOT('BatBot')).then(()=> console.log('OK'))
    cy.wrap(promise).then(ret => console.log(ret))
    cy.wait(3000)
})

Cypress.Commands.add('selectTabBot', () => {
    cy.xpath(loc.TAB_BOT.FN_XP_TAB_BOT('Builder'))
    .should('to.have.text', '\n            Builder \n        ')
})

Cypress.Commands.add('selectTabMore', () => {
    cy.get(loc.TAB_BOT.MORE).should('be.visible')
    cy.get(loc.TAB_BOT.MORE).click()  
})

Cypress.Commands.add('selectMonitoringOption', () => {
    cy.get(loc.TAB_ATENDIMENTO.ATENDIMENTO).click()
})

Cypress.Commands.add('monitoringPage', () => {
    cy.xpath(loc.PAG_ATENDIMENTO.FN_XP_PAGINA('Monitoramento')).should('be.visible')
    cy.xpath(loc.PAG_ATENDIMENTO.FN_XP_PAGINA('Monitoramento')).click()
    cy.get(loc.CABECALHO).should('be.visible')
})

Cypress.Commands.add('reload', () => {
    cy.get(loc.RELOAD.BTN_RELOAD).should('be.visible')
    cy.get(loc.RELOAD.BTN_RELOAD).click()
})

Cypress.Commands.add('assigned', () => {
    cy.get(loc.PAG_ATENDIMENTO.ATRIBUIDO).should('be.visible')   
})

Cypress.Commands.add('inqueue', () => {
    cy.get(loc.PAG_ATENDIMENTO.NAFILA).should('be.visible')  
    cy.get(loc.PAG_ATENDIMENTO.NAFILA).click() 
})

Cypress.Commands.add('attendants', () => {
    cy.get(loc.PAG_ATENDIMENTO.ATENDENTES).should('be.visible')
    cy.get(loc.PAG_ATENDIMENTO.ATENDENTES).click()   
})

Cypress.Commands.add('teams', () => {
    cy.get(loc.PAG_ATENDIMENTO.EQUIPES).should('be.visible')   
    cy.get(loc.PAG_ATENDIMENTO.EQUIPES).click()
})

Cypress.Commands.add('tags', () => {
    cy.get(loc.PAG_ATENDIMENTO.TAGS).should('be.visible')
    cy.get(loc.PAG_ATENDIMENTO.TAGS).click()
})