# Desafio QA Cypress Automation

Testes Automatizados - Desafio QA

Descrição do Desafio: O objetivo deste desafio é realizar a implementação de testes automatizados para os fluxos de cadastro de usuário, login, adição de produto ao carrinho e finalização de compra em uma loja online.

Instalação: Clonar o repositório: git clone https://github.com/tiagodmgs/desafioQA e mover-se para a pasta do projeto cd desafioQA.

Instalar as dependências: npm install

Execução dos Testes: Para executar os testes, utilize o seguinte comando: npm run test

Isso iniciará a execução dos testes automatizados na aplicação.

Cenários Testados

Cadastro de Usuário
Acessar o site. Verificar a existência do logo. Clicar em "Create an Account". Verificar a existência de "Create New Customer Account". Preencher os campos de cadastro. Verificar a mensagem de confirmação de cadastro. Verificar a presença das informações cadastradas.

Login
Acessar o site. Clicar em "Sign In". Preencher os campos de login. Verificar se o login foi realizado com sucesso. Em caso de erro específico ("Invalid Form Key"), realizar um refresh na página e tentar fazer login novamente. Verificar se a saudação de boas-vindas é exibida corretamente.

Adicionar Produto ao Carrinho
Acessar o site. Navegar até a seção "Shop New Yoga". Selecionar o produto "Summit Watch". Adicionar o produto ao carrinho. Verificar a mensagem de confirmação da adição. Verificar se o produto está no carrinho.

Finalização de Compra
Acessar o site. Adicionar um produto ao carrinho (passos do cenário anterior). Prosseguir para o checkout. Preencher os dados de entrega. Confirmar a compra. Verificar a confirmação da compra.

Busca de Produtos (Cenário Opcional)
Acessar o site. Realizar uma busca por camisetas ("shirts"). Verificar os resultados da busca. Verificar a presença de produtos específicos na busca. Limpar a busca. Realizar uma busca por produtos esportivos ("sport"). Verificar os resultados da busca. Verificar a presença de produtos específicos na busca.

Observações: Certifique-se de ter acesso à internet durante a execução dos testes. Caso haja algum problema durante a execução dos testes, consulte a documentação do Cypress para obter suporte. Este projeto foi desenvolvido como parte de um desafio de automação de testes para avaliação de habilidades em QA (Quality Assurance).