/* eslint-disable */

const reserved_instace = {};

describe('Criar 1 instância reservada de qualquer tipo no provedor AWS com sucesso', () => {
  it('confirmar a url da home', () => {
    cy.visit('/');
    cy.url().should('eq', 'http://localhost:3000/#/');
    cy.get('a.v-btn').click();
  });

  it('confirmar a url da end-user', () => {
    cy.url().should('eq', 'http://localhost:3000/#/end-user');
    cy.get('a[href*="#/end-user/iaas/reserved-instance"]')
      .contains('IAAS/reserved-instance')
      .click();
  });

  it('confirmar a url da pagina reserved-instance', () => {
    cy.url().should(
      'eq',
      'http://localhost:3000/#/end-user/iaas/reserved-instance'
    );
    cy.get('button').contains('Adicionar').click();
  });

  it('confirmar a url da pagina create reserved-instance', () => {
    cy.url().should(
      'eq',
      'http://localhost:3000/#/end-user/iaas/reserved-instance/create'
    );
  });

  it('Selecionar provedor', () => {
    let provedor = '643306259611';
    selProvedor(provedor);
  });

  it('Selecionar região', () => {
    cy.wait(1000);
    let regiao = 'Brazil';
    selRegiao(regiao);
  });

  it('Selecionar plataforma', () => {
    let plataforma = 'Linux';
    selPlataforma(plataforma);
  });

  it('Selecionar Instância', () => {
    let tipo = '2 vCPU e 4 GB';
    selInstancia(tipo);
  });

  it('Adicionar Instâncias', () => {
    addInstancia(1);
  });

  it('Selecionar departamento', () => {
    let departamento = 'Budget account 1';
    selecionarDepartamento(departamento);
    pegarValorCardItem('Orçamento');
    pegarValorCardItem('Estimativa de custo mensal');
    pegarValorCardItem('Crédito orçamentário');
  });

  it('Criar Instância', () => {
    let msg = 'Instância reservada criada com sucesso.';
    criarInstancia();
    expect(true).to.eq(compararCredito());
    vericarAlert(msg);
  });
});

describe('Criar múltiplas instâncias reservadas de qualquer tipo no provedor AWS com sucesso.', () => {
  it('Adicionar mais uma intância e reservarda e criar', () => {
    addInstancia(2);
  });
  it('Criar Instância', () => {
    let msg = 'Instância reservada criada com sucesso.';
    criarInstancia();
    expect(true).to.eq(compararCredito());
    vericarAlert(msg);
  });
});

describe('Selecionar conta de orçamento que não possui crédito suficiente e verificar mensagem de erro e bloqueio de criação', () => {
  it('Selecionar conta de orçamento', () => {
    let departamento = 'Huawei Compute Instances for Engineering department';
    selecionarDepartamento(departamento);
    pegarValorCardItem('Estimativa de custo mensal');
    pegarValorCardItem('Crédito orçamentário');
  });

  it('Criar Instância', () => {
    let msg =
      'Você não possui crédito suficiente! Altere a conta de orçamento ou fale com seu gestor.';
    expect(false).to.eq(compararCredito());
    estadoButton();
    vericarAlert(msg);
  });
});

describe('Não preencher campos obrigatórios e verificar se bloqueio de criação ocorre quando provedor AWS.', () => {
  it('Deixar campo de Conta de Orçamento vazio', () => {
    //cy.get('input[placeholder="Conta de orçamento"]').clear();
  });

  it('verificar estado do botão criar', () => {
    buttonDisabled();
  });
});

describe('Verificar se etapa de resumo exibe as opções corretas selecionadas.', () => {
  it('Validar card item de Assinatura', () => {
    validarCards('Assinatura', reserved_instace.provedor);
  });

  it('Validar card item de Região', () => {
    validarCards('Região', reserved_instace.regiao);
  });

  it('Validar card item de Região', () => {
    validarCards('Plataforma', reserved_instace.sistema_nome);
  });

  it('Validar card item de Instância', () => {
    validarCards('Instância', reserved_instace.tipo_instancia);
  });

  it('Validar card item de Instância', () => {
    validarCards('Quantidade', reserved_instace.qtdInstancias);
  });

  it('Validar card item de Orçamento', () => {
    validarCards('Orçamento', reserved_instace.orcamento.trim());
  });

  it('Validar card item Estimativa de custo mensal', () => {
    validarCards('Estimativa de custo mensal', reserved_instace.custo_mensal);
  });

  it('Validar card item Crédito orçamentário', () => {
    validarCards('Crédito orçamentário', reserved_instace.credito);
  });
});

describe('Confirmar que listagem de subscrições exibe apenas AWS', () => {
  it('Verificar se todos provedores são AWS', () => {
    for (let index = 0; index < 4; index++) {
      cy.get('div.v-select-list')
        .first()
        .within(() => {
          cy.get('div.v-avatar')
            .eq(index)
            .within(() => {
              cy.get(
                'img[src="/_nuxt/src/ui/core/assets/img/brands/aws-icon.svg"]'
              );
            });
          1;
        });
    }
  });
});

describe('Verificar se a tela se comporta corretamente após troca de provedor e região', () => {
  it('alterar provedor', () => {
    selProvedor('194059856171');
  });

  it('verificar se o form esta oculto', () => {
    cy.get('form[novalidate="novalidate"]').should('not.exist');
  });
});

function selProvedor(provedor) {
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
          // console.log(reserved_instace.provedor)
        });
    });
}

function selRegiao(regiao) {
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
        });
    });
}

function selPlataforma(plataforma) {
  cy.get('div').contains(plataforma).click();
  cy.get('div')
    .contains(plataforma)
    .invoke('text')
    .then(($val) => {
      reserved_instace.sistema_nome = $val;
    });
}

function selInstancia(tipo) {
  cy.get('div.v-card__text').contains(tipo).click({ force: true });
  cy.get('div.v-card__text')
    .contains(tipo)
    .closest('div.v-card')
    .within(() => {
      cy.get('div.v-card__text')
        .contains(tipo)
        .invoke('text')
        .then(($val) => {
          reserved_instace.tipo_instancia = $val;
        });
    });
}

function addInstancia(valor) {
  for (let i = 1; i < valor; i++) {
    cy.get('button.mdi-plus').click();
  }

  cy.get('div.v-input__slot')
    .get('div')
    .contains('Instância(s)')
    .closest('div.v-text-field__slot')
    .within(() => {
      cy.get('input')
        .invoke('val')
        .then(($val) => {
          reserved_instace.qtdInstancias = parseInt($val);
        });
    });
}

function selecionarDepartamento(departamento) {
  cy.get('input[placeholder="Conta de orçamento"]').click();
  cy.get('div.v-list-item__title').contains(departamento).click();
  cy.get('div.v-select__selections')
    .contains(departamento)
    .invoke('text')
    .then(($val) => {
      reserved_instace.orcamento = $val;
    });
}

function pegarValorCardItem(tag) {
  cy.get('[data-test="card-list-item-title"]')
    .contains(tag)
    .closest('[data-test="card-list-item"]')
    .within(() => {
      cy.get('[data-test="card-list-item-value"]')
        .invoke('text')
        .then(($val) => {
          let converter = $val.replace('R$', '');
          converter = converter.replace(',', '.');
          if (tag === 'Estimativa de custo mensal') {
            reserved_instace.custo_mensal = parseFloat(converter.trim());
          } else {
            reserved_instace.credito = parseFloat(converter.trim());
          }
        });
    });
}

function criarInstancia() {
  cy.get('button').contains('Criar').click();
}

function buttonDisabled() {
  cy.get('button[disabled="disabled"].v-btn').contains('Criar');
}

function vericarAlert(msg) {
  cy.get('div.v-alert__content').contains(msg);
}

function validarCards(tag, campo) {
  let moeda = '';
  cy.get('[data-test="card-list-item-title"]')
    .contains(tag)
    .closest('[data-test="card-list-item"]')
    .within(() => {
      if (
        tag === 'Estimativa de custo mensal' ||
        tag === 'Crédito orçamentário'
      ) {
        moeda = `R$ ${campo}`;
        moeda = moeda.replace('.', ',');
        cy.get('[data-test="card-list-item-value"]').contains(`${moeda}`);
      } else {
        cy.get('[data-test="card-list-item-value"]').contains(`${campo}`);
      }
    });
}

function compararCredito() {
  if (reserved_instace.credito >= reserved_instace.custo_mensal) {
    return true;
  }
  return false;
}
