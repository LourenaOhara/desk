import 'cypress-shadow-dom';

/// reference types="cypress" />

describe('Blip Desk', () => {
    let waitingTickets;
    let atWaitingTickets;
    let openTicketsCount;
    let id;
    let ticketId;

    it('Verificar status do atendente como Invisível', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#agent-status').should('be.visible')
        cy.get('#agent-status').contains('Invisível')
    })

    it('Atendente fica online e informação de tickets em espera é exibida '+ 
    'é atualizado conforme tickets em espera', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#set-online-btn').should('be.visible')
        cy.get('#set-online-btn').click()
        cy.wait(2000)
        cy.get('#waiting-tickets-count').should('be.visible')
        cy.get('#waiting-tickets-count').then(($span) => {
            waitingTickets = $span.text();
            cy.log(waitingTickets);
           })
        cy.get('.ss-content')
        .find('article')
        .then(article => {
            openTicketsCount = Cypress.$(article).length;
            expect(article).to.have.length(openTicketsCount);
        });
    })

    it('Gerar um novo atendimento acessando o bot', () => {
            cy.request({
            method: 'POST',
            url: 'https://hmg-http.msging.net/commands',
            headers : {
                'Content-Type': 'application/json',
                Authorization: 'Key dGVzdGVib3Q1OmVjM0ZlWEc2eUNFNElEVElyY0VL',
            },
            body : {
                "id": "06101989",
                "to": "postmaster@desk.msging.net",
                "method": "set",
                "uri": "/tickets",
                "type": "application/vnd.iris.ticket+json",
                "resource": {
                  "customerIdentity": "Robin"
                }
            },
        }).as('ticket')
        cy.get('@ticket').its('status').should('be.equal', 200)
    })

    it('Tickets em espera recebe novo valor', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#set-online-btn').should('be.visible')
        cy.get('#set-online-btn').click()
        cy.wait(2000)
        cy.get('#waiting-tickets-count').should('be.visible')
        cy.get('#waiting-tickets-count').then(($span) => {
            atWaitingTickets = $span.text();
            cy.log(atWaitingTickets);
            if(atWaitingTickets == waitingTickets+1)
                return true   
         })
    })

    it('Atendente online atende novo cliente e atualiza número de tickets atribuídos', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#set-online-btn').should('be.visible')
        cy.get('#set-online-btn').click()
        cy.wait(2000)
        cy.get('#claim-ticket-button').should('be.visible')
        cy.get('#claim-ticket-button').click()
        cy.wait(2000)
        cy.get('.ss-content')
        .find('article')
        .then(article => {
            openTicketsCount = Cypress.$(article).length;
            expect(article).to.have.length(openTicketsCount);
        });
    })

    it('Recupera informações do id do cliente', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#set-online-btn').should('be.visible')
        cy.get('#set-online-btn').click()
        cy.wait(2000)
        cy.get('bds-button.hydrated').click()
        cy.wait(2000)
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").should('be.visible')
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").click()
        cy.get('#show-user-info').should('be.visible')
        cy.get('#show-user-info').click()
        cy.wait(2000)
        cy.xpath("//p[contains(@class, 'profile-info-item')]//span[2]").then(($span) => {
            id = $span.text();
            cy.log(id);
        })  
    })

    it('Atende inicia atendimento do último ticket obtido', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#set-online-btn').should('be.visible')
        cy.get('#set-online-btn').click()
        cy.wait(1000)
        cy.get('bds-button.hydrated').click()
        cy.wait(1000)
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").should('be.visible')
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").click()
        cy.wait(2000)
        cy.get('#text-input').type('Olá, eu sou o Batman. Como posso te ajudar?')
        cy.get('#blip-send-message').should('be.visible')
        cy.get('#blip-send-message').click()
        cy.get('#text-input').type('Alô você ainda está aí?')
        cy.get('#blip-send-message').should('be.visible')
        cy.get('#blip-send-message').click()
    })

    it('Atendente insere comentários no ticket em atendimento', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#set-online-btn').should('be.visible')
        cy.get('#set-online-btn').click()
        cy.wait(1000)
        cy.get('bds-button.hydrated').click()
        cy.wait(1000)
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").should('be.visible')
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").click()
        cy.wait(2000)
        cy.get('#show-user-info').should('be.visible')
        cy.get('#show-user-info').click()
        cy.get('#comment-input').should('be.visible')
    })

    it('Atendente transfere o ticket em atendimento', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#set-online-btn').should('be.visible')
        cy.get('#set-online-btn').click()
        cy.wait(1000)
        cy.get('bds-button.hydrated').click()
        cy.wait(1000)
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").should('be.visible')
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").click()
        cy.wait(2000)
        cy.get('#transfer-ticket-button').should('be.visible')
        cy.get('#transfer-ticket-button').click()
        cy.xpath("//div[contains(@class, 'multiselect__select')]").should('be.visible')
        cy.xpath("//div[contains(@class, 'multiselect__select')]").click()
        cy.xpath("//div[contains(@class, 'option')]//span[contains(., 'Default')]").should('be.visible')
        cy.xpath("//div[contains(@class, 'option')]//span[contains(., 'Default')]").click()
        cy.get('#confirm-transfer-btn').should('be.visible')
        cy.get('#confirm-transfer-btn').click()
        cy.get('#closed-attendance').should('be.visible')
    })
    it('Finalizar ticket e selecionar tag - Atendente', () => {
        cy.visit('https://hmg-desk.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.get('#set-online-btn').should('be.visible')
        cy.get('#set-online-btn').click()
        cy.wait(1000)
        cy.get('#claim-ticket-button').should('be.visible')
        cy.get('#claim-ticket-button').click()
        cy.wait(2000)
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").should('be.visible')
        cy.xpath("//article[contains(@class, 'chat-list-item')][1]").click()
        cy.wait(1000)
        cy.get('#close-ticket-button').should('be.visible')
        cy.get('#close-ticket-button').click()
        cy.xpath("//div[contains(@class, 'multiselect__select')]").should('be.visible')
        cy.xpath("//div[contains(@class, 'multiselect__select')]").click()
        cy.xpath("//span[contains(@class, 'multiselect__option')]//span[contains(., 'gotham')]").should('be.visible')
        cy.xpath("//span[contains(@class, 'multiselect__option')]//span[contains(., 'gotham')]").click()
        cy.get("#close-attendance").click()
        cy.get('#confirm-close-btn').should('be.visible')
        cy.get('#confirm-close-btn').click()
        cy.get('#closed-attendance').should('be.visible')
    })

    it('Finalizar primeiro ticket e selecionar tag - Gestor', () => {
        cy.visit('https://hmg-portal.blip.ai/')
        cy.get('#email').type('lourena+teste@take.net')
        cy.get("#password").type('150152')
        cy.get('#blip-login').click()
        cy.wait(3000)
        cy.xpath("//span[contains(., 'BatBot')]").should('be.visible')
        cy.xpath("//span[contains(., 'BatBot')]").click()
        cy.wait(3000)
        cy.xpath("//i[contains(@class, 'icon-menumore')]").should('be.visible')
        cy.xpath("//i[contains(@class, 'icon-menumore')]").click()
        cy.wait(2000)
        cy.get('.dropdown-item-content > .ma0 > :nth-child(2)').should('be.visible')
        cy.get('.dropdown-item-content > .ma0 > :nth-child(2)').click()
        cy.wait(2000)
        cy.xpath("//*[@id='helpdesk-menu-monitoring']/li/a").should('be.visible')
        cy.xpath("//*[@id='helpdesk-menu-monitoring']/li/a").click()
        cy.wait(2000)
        cy.get('.blip-ui-content').should('be.visible')
        cy.xpath("//*[@id='open-tickets-table']/tbody/tr[1]").should('be.visible')
        cy.xpath("//*[@id='open-tickets-table']/tbody/tr[1]").click()
        cy.wait(1000)
        cy.xpath("//div[contains(@class, 'check-icon')]").should('be.visible')
        cy.xpath("//div[contains(@class, 'check-icon')]").click()
        cy.xpath("//div[contains(@class, 'blip-tags')]//div[contains(@class, 'blip-select__show-arrow')]").should('be.visible')
        cy.xpath("//div[contains(@class, 'blip-tags')]//div[contains(@class, 'blip-select__show-arrow')]").click()
        cy.xpath("//div[contains(@class, 'blip-select__options')]//span[contains(., 'bruce')]").should('be.visible')
        cy.xpath("//div[contains(@class, 'blip-select__options')]//span[contains(., 'bruce')]").click()
        cy.xpath("//button[contains(@class, 'bp-btn bp-btn--bot')]").should('be.visible')
        cy.xpath("//button[contains(@class, 'bp-btn bp-btn--bot')]").click()
        cy.xpath("//div[contains(@class, 'alert-success')]").should('be.visible')
    })
})