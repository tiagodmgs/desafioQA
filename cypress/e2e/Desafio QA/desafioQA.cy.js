describe('Desafio QA', () => {
  const email = 'testemail@hotmail.com';
  const password = 'Senha123!@';
  const firstName = 'Test';
  const lastName = 'QA';
  const Address = 'Test Address Street';
  const Country = 'Brazil';
  const State = 'Santa Catarina';

  it('Cadastro de usuário', () => {
    cy.visit("https://magento2-demo.magebit.com/");
    cy.log('Visitou o site');
    cy.get('a.logo[href="https://magento2-demo.magebit.com/"]').should('exist');
    cy.log('Verificou a existência do logo');
    cy.contains('Create an Account').click();
    cy.log('Clicou em "Create an Account"');
    cy.contains('Create New Customer Account').should('exist');
    cy.log('Verificou a existência de "Create New Customer Account"');
    cy.get('#firstname').click();
    cy.get('#firstname').type(firstName);
    cy.get('#lastname').click();
    cy.get('#lastname').type(lastName);
    cy.get('#is_subscribed').check();
    cy.get('#is_subscribed').should('be.checked');
    cy.get('#email_address').click();
    cy.get('#email_address').type(email);
    cy.get('#password').click();
    cy.get('#password').type(password);
    cy.get('#password-confirmation').click();
    cy.get('#password-confirmation').type(password);
    cy.get('#password-strength-meter').should('exist');
    cy.get('.action.submit.primary').click();
    cy.contains('h1.page-title', 'My Account').should('exist');
    cy.contains('div', 'Thank you for registering with Main Website Store.').should('be.visible');
    cy.contains(firstName).should('exist');
    cy.contains(lastName).should('exist');
    cy.contains(email).should('exist');
  });


  it('Login', () => {
    cy.visit("https://magento2-demo.magebit.com/");
    cy.contains('Sign In').click();
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.get('button.action.login.primary[name="send"]').click();

    // Verificar se ocorreu um erro de login
    cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').should('exist').then(($error) => {
      if ($error.length > 0 && $error.text().includes('Invalid Form Key')) {
        // Se houver um erro específico, dê um refresh na página e tente fazer login novamente
        cy.log('Login falhou devido a um erro específico. Refresh na página e tentando novamente.');
        cy.reload();

        // Continuar com o restante do teste após o refresh
        cy.contains('Sign In').click();
        cy.get('#email').type(email);
        cy.get('#pass').type(password);
        cy.get('button.action.login.primary[name="send"]').click();
      } else {
        // Verificar se a saudação de boas-vindas é exibida corretamente
        cy.get('li.greet.welcome').should('exist').invoke('text').should('include', 'Welcome,');

        // Continuar com o restante do teste
        cy.get('li.customer-welcome button.action.switch').first().click();
        cy.contains('li.customer-welcome a', 'My Account').should('be.visible').click();
        cy.contains('h1.page-title', 'My Account').should('exist');
      }
    });
  });


  it('Adicionar produto ao carrinho', () => {
    cy.visit("https://magento2-demo.magebit.com/");
    cy.contains('span.action.more.button', 'Shop New Yoga').click();
    cy.get('img[alt="Summit Watch"]').click();
    cy.get('ul.items li.item.product strong').should('contain.text', 'Summit Watch');
    cy.contains('span', 'Add to Cart').should('be.visible').click();
    cy.contains('div[data-bind^="html: $parent.prepareMessageForHtml(message.text)"]', 'You added Summit Watch to your shopping cart').should('be.visible');
    cy.get('div[data-block="minicart"].minicart-wrapper').find('a.action.showcart').click();
    cy.get('div.product-item-details strong.product-item-name a').should('contain.text', 'Summit Watch');
  })

  it('Finalizar a compra de algum produto', () => {
    cy.visit("https://magento2-demo.magebit.com/");
    cy.contains('span.action.more.button', 'Shop New Yoga').click();
    cy.get('img[alt="Summit Watch"]').click();
    cy.contains('span', 'Add to Cart').should('be.visible').click();
    cy.contains('div[data-bind^="html: $parent.prepareMessageForHtml(message.text)"]', 'You added Summit Watch to your shopping cart').should('be.visible');
    cy.get('div[data-block="minicart"].minicart-wrapper').find('a.action.showcart').click();
    cy.get('div.product-item-details strong.product-item-name a').should('contain.text', 'Summit Watch');
    cy.get('#top-cart-btn-checkout').click();
    cy.get('#customer-email').click().type('test@mail.com');
    cy.get('input[name="firstname"].input-text').should('exist').click().type(firstName);
    cy.get('input[name="lastname"].input-text').should('exist').click().type(lastName);
    cy.get('input[name="street[0]"][aria-required="true"][aria-invalid="false"]').click().type(Address);
    cy.get('select[name="country_id"]').select(Country);
    cy.get('select[name="region_id"]').select(State);
    cy.get('input[name="city"][aria-required="true"][aria-invalid="false"]').click().type("Florianopolis");
    cy.get('input[name="postcode"][aria-required="true"][aria-invalid="false"]').click().type("88058");
    cy.get('input[name="telephone"]').should('exist').click().type("48999999999");
    cy.get('input[name="ko_unique_3"]').check();
    cy.get('button.button.action.continue.primary span[data-bind="i18n: \'Next\'"]').click();
    cy.get('.minicart-items .product-item').should('have.length', 1);
    cy.get('.minicart-items .product-item').within(() => {
      cy.get('.product-item-name').should('contain.text', 'Summit Watch');
      cy.get('.details-qty .value').should('have.text', '1');
    });
    cy.get('button.action.primary.checkout').click();
    cy.get('span.base[data-ui-id="page-title-wrapper"]').should('be.visible').and('have.text', 'Thank you for your purchase!');
  });

  it('Busca de Produtos', () => {
    cy.visit("https://magento2-demo.magebit.com/");
    cy.get('#search').type('shirts{enter}');
    cy.wait(3000);
    cy.get('span.base[data-ui-id="page-title-wrapper"]').should('contain.text', "Search results for: 'shirts'");
    cy.get('img[alt="Radiant Tee"]').should('be.visible');
    cy.get('img[alt="Balboa Persistence Tee"]').should('be.visible');
    cy.get('img[alt="Proteus Fitness Jackshirt"]').should('be.visible');
    cy.get('#search').clear();
    cy.get('#search').type('sport{enter}');
    cy.get('span.base[data-ui-id="page-title-wrapper"]').should('contain.text', "Search results for: 'sport'");
    cy.get('img[alt="Erica Evercool Sports Bra"]').should('be.visible');
    cy.get('img[alt="Celeste Sports Bra"]').should('be.visible');
    cy.get('img[alt="Rapha  Sports Short"]').should('be.visible');
  });

});
