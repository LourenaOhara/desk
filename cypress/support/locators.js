const locators = {
    LOGIN : {
        USER:'#email',
        PASSWORD:'#password',
        BTN_LOGIN:'#blip-login',
        MESSAGE: '#welcome-message'
    },

    CONTACT_LIST : {
        BOT_LIST: '.contact-list',
        FN_XP_BTN_BOT: nome => `//span[contains(., '${nome}')]`
    },

    TAB_BOT : {
        FN_XP_TAB_BOT: tab => `//span[contains(., '${tab}')]`,
        MORE: '.subheader-more-items'
    },

    TAB_ATENDIMENTO : {
        ATENDIMENTO : '[ui-sref="auth.application.detail.attendance(dropdownMenuItem.sparams)"]'
    },

    PAG_ATENDIMENTO : {
        FN_XP_PAGINA : nome => `//span[contains(., '${nome}')]`,
        ATRIBUIDO : '#content-tab-0',
        NAFILA: '#content-tab-1',
        ATENDENTES: '#content-tab-2',
        EQUIPES: '#content-tab-3',
        TAGS: '#content-tab-4'
    },

    RELOAD : {
        BTN_RELOAD : '.desk-dashboard-title-icon > .reload-button > [ng-disabled="$ctrl.disabled"]'
    },

    CABECALHO : '#helpdesk-dashboard-header',
}

export default locators;