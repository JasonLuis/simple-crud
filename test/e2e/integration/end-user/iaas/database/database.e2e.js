/* eslint-disable */

const reserved_instace = {};

describe('Criar 1 banco de dados de qualquer tipo no provedor AWS com sucesso', ()=> {

  it('confirmar a url da home', ()=>{
    cy.visit('/');
    cy.url().should('eq', 'http://localhost:3000/#/');
    cy.get('a.v-btn').click();
  });

  it('confirmar a url da end-user', ()=>{
    cy.url().should('eq', 'http://localhost:3000/#/end-user');
    cy.get('a[href*="#/end-user/iaas/database"]').click();
  });

  it('confirmar a url da pagina database', () => {
    cy.url().should('eq','http://localhost:3000/#/end-user/iaas/database');
    cy.get('button').contains('Provisionar banco de dados').click();
  });

  it('confirmar a url da pagina create database', () => {
    cy.url().should('eq','http://localhost:3000/#/end-user/iaas/database/create');
  });

  it('Selecionar provedor', ()=>{
    let provedor = '801384778006';
    selProvedor(provedor)
  });

  it('Selecionar região', ()=>{
    cy.wait(1000);
    let regiao = "Brazil";
    selRegiao(regiao);
  });
});


function selProvedor(provedor){
  cy.get('div.v-select__selections').first().click();
  cy.get('div.v-list-item__content').contains(provedor).click();
  cy.get('div.v-list-item__title.subtitle-1')
    .first()
    .invoke('text')
    .then(($val) => {
      cy.get('div.v-list-item__subtitle.subtitle-2')
        .first()
        .invoke('text')
        .then(($val2) => {
            reserved_instace.provedor = `aws (${$val2})`;
            //console.log(reserved_instace.provedor)
        });
  });
}

function selRegiao(regiao){
  cy.get('div.v-select__selections').last().click();
    cy.get('div.v-list').contains(regiao).click();

    cy.get('div.v-list-item__title.subtitle-1')
      .last()
      .invoke('text')
      .then(($val) => {
        cy.get('div.v-list-item__subtitle.subtitle-2')
          .last()
          .invoke('text')
          .then(($val2) => {
              reserved_instace.regiao = `${$val} (${$val2})`;
              // console.log(reserved_instace.regiao)
          });
      });
}

function selPlataforma(plataforma){
  cy.get('div').contains(plataforma).click();
    cy.get('div')
      .contains(plataforma)
      .invoke('text')
      .then(($val) => {
        reserved_instace.sistema_nome = $val
      });
}
