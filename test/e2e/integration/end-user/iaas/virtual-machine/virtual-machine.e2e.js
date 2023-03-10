/* eslint-disable */
import VirtualMachineModel from '../../../../fixtures/models/virtual_machine_model';
const model = new VirtualMachineModel();

const SSH = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDO4IJ8PmNjgB1WeSyTRLQ1aAEjo6ReEamf9w4mO/zZICETkv5nfq0V3SCrSmfQMadDlnNBZls8lPrpeRHolRLAIjgW6oM61bg9hxKpkVwtNdZwxV0cpXy5QpDely+uyaZOAB6MCKp1zYsVSsELzOPXRw92bTjz/VUZTjjhRK6Gwlv98F8qRK4VWaSIRhbQP0vNsyJLdvrCzVOaI5SoNz9LtxtAUXKdI9eht/YwubkKJH//wRt3TPWCjfN1kIGKVmn/tezGfJio+lvUWHR04eI5WNaahyM0tIgK4Q2AD4awjGE2G9+Uw088ltYQseRgjfS9iOJmgks2DUsnkeMprDwz";
const nome = "AAAA";
describe('Validação página de END-USER', () => {

  it('Página index /END-USER', () => {
    cy.visit('/');
    cy.contains('.headline', ' Projeto Vivo ME ');
    cy.contains('.v-card__text p', 'Projeto Vivo ME (GWCloud)');
    cy.get('a.v-btn').click();
  });

  it('Página end-user IAAS/VM', () => {
    cy.contains('.headline', ' Projeto Vivo ME ');
    cy.contains('.v-card__text p', 'End User');
    cy.get('a[href*="#/end-user/iaas/virtual-machine"]').click();
  });

  it('Página de Virtual-Machine', () => {
    cy.contains('.text-h4', 'Máquina virtual e instância reservada');
    cy.contains('.text--secondary','Recursos computacionais para atender a sua carga de trabalho'
    );
    cy.get('button').contains('Provisionar Máquinas Virtuais').click();
  });
})

describe('Validação de Provedor e Região', () => {

  it('Valida Texto e Subtexto de provisionar máquina virtual', () => {
    cy.contains('.text-h4', 'Provisionar máquinas virtuais');
    cy.contains('.text--secondary','Crie máquinas virtuais no provedor e região desejados e selecione a melhor oferta para atender a sua carga de trabalho ');
  });

  it('Selecionar Provedor e Região', () => {
    //Campo provedor e Subscrição
    textoESubtexto_MV('Provedor e subscrição', 'Selecione a subscrição do provedor de cloud')
    cy.get('div.v-select__selections').first().click();
    cy.get('div.v-list-item__title').contains('Aws Account 1').click();

    //Região
    textoESubtexto_MV('Região', 'Selecione a região do provedor')
    cy.get('div.v-select__selections').last().click();
    cy.get('div.v-list-item__title').contains('South America (São Paulo)').click();

  });
});

describe('Validação de Steps 1 a 8', () => {

  it('Step 1 - Sistema operacional', () => {
    textoESubtexto_Step('Sistema operacional', 'Selecione o sistema operacional e versão de sua preferência')

    cy.get('div.col-12 div div.rounded div.v-card__text b').contains('CentOS').click();
  });

  it('Step 3 - Rede', () => {
    textoESubtexto_Step('Rede', 'Informe a rede desejada para lançar os recursos')
    cy.contains('div.v-alert__content', 'Selecione a VPC e a subnet existentes para instanciar o recurso. Caso deseje criar uma nova rede,');

    cy.wait(1000);
    cy.get('div.col div.v-autocomplete div.v-input__control div.v-input__slot div label.theme--light').first().click({ force: true });
    cy.get('div.v-list-item__title').contains('vpc-2771a541').click();

    cy.wait(1000);
    cy.get('label.theme--light').contains('Selecione a Subnet').click({force: true});
    cy.get('div.v-list-item__title').contains('subnet-44ec8c3f | ap-northeast-2b').click();
  });

  it('Step 4 - Autenticação', () => {
    textoESubtexto_Step('Autenticação', 'Preencha as informações para autenticação nas máquinas virtuais')

    cy.get('textarea').type(SSH);

    cy.get('label.theme--light').contains('Nome').click({force: true});
    cy.get('input[placeholder="De um nome para identificar sua chave SSH"]').type(nome)
  });

  it('Step 5 - Configuração', () => {
    textoESubtexto_Step('Configuração', 'Informe as configurações da máquina virtual')

    cy.get('button.mdi-plus').click();
    cy.get('button.mdi-plus').click();
    cy.get('button.mdi-plus').click();

    cy.get('input[type="checkbox"]').click({ multiple: true });

  });

  it('Step 6 - Tags', ()=> {
    textoESubtexto_Step('Tags', 'Organize os recursos utilizando tags')

    gerarTag('TESTE1', '1')
    gerarTag('TESTE2', '2')
    gerarTag('TESTE3', '3')

    cy.get('button.mdi-close-circle').first().click();

  });

  it('Step 7 - Orçamento', ()=> {
    textoESubtexto_Step('Orçamento', 'Selecione a conta de orçamento onde deseja lançar os recursos')

    cy.get('input[placeholder="Conta de orçamento"]').click();
    cy.get('div.v-list-item__title').contains('Budget account 2').click();

  });

  it('Step 8 - Resumo e Lançamento', ()=> {
    textoESubtexto_Step('Resumo e lançamento', 'Verifique as informações e execute o lançamento')

    validarResumo('Assinatura','aws (643306259611)')
    validarResumo('Região','South America (São Paulo) (Brazil)')
    validarResumo('Sistema operacional','CentOS (8.2 2004)')
    validarResumo('Instância','1 vCPU e 2 GB')
    validarResumo('Rede','vpc-2771a541 (subnet-44ec8c3f | ap-northeast-2b)')
    validarResumo('Quantidade','4')
    validarResumo('Monitoramento','Sim')
    validarResumo('IP público','Sim')
    validarResumo('Departamento','Financeiro')
    validarResumo('Orçamento','Budget account 2')

  });
});

describe('Validações extras', () => {

  it('Verificar a possibilidade de criar uma VM sem credito', () => {
    
    if (model._credito < model._custo) {
      cy.get('div[role="alert"]').contains(
        'Você não possui crédito suficiente! Altere a conta de orçamento ou fale com seu gestor'
      );
      cy.get('button[disabled="disabled"]').contains('Criar');
    }
  });

  it('inserir nome de VM', ()=>{
    cy.get('[data-test=input-vm-name]').type("Teste")
  })

  it('Verificar a possibilidade de criar uma VM com credito', () => {
    
    AcrescentarInstancia()
    if (model._credito >= model._custo) {
      cy.get('button.v-btn').contains('Criar').click();

      cy.contains('Sucesso ao criar. Para ver').should('be.visible')
    }
    ObterValor();
  });
});


function textoESubtexto_MV(texto, subtexto) {
  cy.contains('div.mb-2', texto);
  cy.contains('div.text--secondary', subtexto);
}

function textoESubtexto_Step(texto, subtexto) {
  cy.get('p.secondary--text').contains(texto);
  cy.get('p.mb-0').contains(subtexto);
}

function gerarTag(chave, valor) {
  cy.get('[data-test=input-tag-key]').type(chave);
  cy.get('[data-test=input-tag-value]').type(valor);
  cy.get('[data-test=btn-tag-add]').click();
}

function validarResumo(texto, valor) {
  cy.get('span.text--primary').contains(texto);
  cy.get('[data-test="card-list-item-value"]').contains(valor);
}

function ObterValor() {
  cy.get('[data-test="card-list-item-title"]')
    .contains('Estimativa de custo mensal')
    .closest('[data-test="card-list-item"]')
    .within(() => {
      cy.get('[data-test="card-list-item-value"]')
        .invoke('text')
        .then(($val) => {
          model._custo = parseFloat(
            $val.replace('R$', '').replace(',', '.').trim()
          );
        });
    });

  cy.get('[data-test="card-list-item-title"]')
    .contains('Crédito orçamentário')
    .closest('[data-test="card-list-item"]')
    .within(() => {
      cy.get('[data-test="card-list-item-value"]')
        .invoke('text')
        .then(($val) => {
          model._credito = parseFloat(
            $val.replace('R$', '').replace(',', '.').trim()
          );
        });
    });
}

function AcrescentarInstancia(){
  cy.get('button.v-icon.mdi-plus').click();
  cy.get('div.v-select__selections').last().click({ force: true });
  cy.get('div.v-list-item__title').contains('Budget account 1').click();
}
