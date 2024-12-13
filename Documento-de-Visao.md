# MarcaSUS

## 1. Introdução
### 1.1 Propósito
O presente documento descreve a visão geral do sistema MarcaSus, uma ferramenta web e mobile destinada a facilitar a marcação e desmarcação de consultas nas Unidades Básicas de Saúde (UBS) vinculadas ao Sistema Único de Saúde (SUS). O objetivo principal é reduzir filas presenciais, otimizar o fluxo de atendimento e melhorar a experiência dos usuários e funcionários das UBS.

### 1.2 Escopo
O MarcaSUS digital possibilita que usuários com acesso à internet realizem agendamentos e cancelamentos de consultas remotamente, além de visualizarem consultas agendadas. Para os funcionários das UBS, o sistema oferecerá funcionalidades para gerenciar as agendas dos médicos e realizar operações administrativas relacionadas às consultas, enquanto mantém o sistema de filas presencial para atender aos 36 milhões de brasileiros que ainda não possuem acesso à internet.


## 2. Descrições do Sistema
### 2.1 Ambiente
O sistema MarcaSus será acessível por meio de plataformas web responsivas e mobile, garantindo flexibilidade e acessibilidade para os usuários, independentemente do dispositivo que utilizam. 
Os usuários terão acesso à plataforma web e mobile, permitindo o agendamento e o cancelamento de consultas nas Unidades Básicas de Saúde (UBS) vinculadas ao Sistema Único de Saúde (SUS).
O funcionário também terá acesso à mesma plataforma web e mobile, mas com recursos adicionais para gerenciar a agenda dos médicos, controlar o fluxo de atendimentos e realizar o agendamento de consultas em nome dos pacientes.
A interface será responsiva, permitindo ao funcionário acessar a plataforma tanto em dispositivos móveis quanto em desktops, otimizando o uso no ambiente da UBS.

### 2.2 Funcionalidades 
1. Login: Autenticação para usuários e funcionários, pode ser realizado diretamente pelo sistema MarcaSus ou por meio da integração com a plataforma Gov.br, garantindo segurança e praticidade no acesso.
2. Marcar Consulta: Permite agendar consultas médicas.
3. Desmarcar Consulta: Cancela consultas previamente agendadas.
4. Visualizar Consultas: Exibe uma lista das consultas confirmadas.
5. Preencher Agenda do Médico (funcionários UBS): Adiciona e organiza horários disponíveis para consultas.
6. Visualizar Agenda (funcionários UBS): Visualiza a agenda preenchida.

### 2.1 Restrições
* Necessidade de acesso à internet para uso remoto.
* Disponibilidade inicial apenas em dispositivos Android e navegadores web modernos.
* Integração com o sistema interno de gestão das UBS.

## 3. Atores e Casos de Uso
### 3.1 Atores
* **Usuário**: Paciente que utiliza o sistema para gerenciar suas consultas.
* **Funcionário UBS**: Responsável pela administração das agendas e suporte aos pacientes.

### 3.2 Casos de Uso - Usuário
### Usuário - Login

### Cenário Principal (Fluxo Principal)
1. O usuário acessa a tela de login.
2. O usuário escolhe a forma de login (pode ser via Gov.br ou diretamente pelo sistema).
3. O sistema valida as credenciais do usuário.
4. Se a autenticação for bem-sucedida, o usuário é direcionado para a tela principal do sistema, onde pode:
   - Marcar
   - Reagendar
   - Visualizar
   - Desmarcar consultas.

### Cenário Alternativo 1 - Usuário Não Cadastrado
1. O usuário tenta realizar o login com um CPF e senha que não correspondem a um cadastro existente.
2. O sistema exibe uma mensagem de erro informando que as credenciais não são válidas.
3. O sistema oferece a opção de Cadastro.
4. O usuário é redirecionado para a tela de Cadastro.
5. O usuário preenche seus dados pessoais e realiza o cadastro.
6. Após o cadastro, o usuário pode realizar o login novamente, seguindo o fluxo principal.

### Cenário Alternativo 2 - Dados de Login Incorretos
1. O usuário insere um CPF e senha incorretos.
2. O sistema exibe uma mensagem de erro solicitando que o usuário verifique os dados inseridos.
3. O usuário tem a opção de:
   - Tentar novamente.
   - Recuperar a senha.

---

### Caso de Uso: Usuário - Marcar Consulta

### Cenário Principal (Fluxo Principal)
1. O usuário acessa a tela para Marcar Consulta.
2. O sistema exibe os médicos disponíveis e os horários livres.
3. O usuário seleciona o médico e o horário desejado.
4. O sistema confirma o agendamento da consulta.
5. O usuário recebe uma notificação confirmando o agendamento.

### Cenário Alternativo 1 - Não Há Mais Agenda Disponível para o Mês
1. O usuário tenta agendar uma consulta para o mês corrente.
2. O sistema verifica que não há mais horários disponíveis para o mês.
3. O sistema exibe uma mensagem informando que a agenda está cheia e oferece as opções:
   - Agendar para o próximo mês.
   - Aguardar abertura de novos horários.
4. O usuário escolhe uma das opções ou sai da tela de agendamento.

### Cenário Alternativo 2 - Horário Selecionado Já Está Agendado
1. O usuário tenta selecionar um horário que já está ocupado.
2. O sistema exibe uma mensagem informando que o horário já foi preenchido.
3. O usuário pode:
   - Selecionar outro horário disponível.
   - Voltar à lista de horários.

---

### Caso de Uso: Usuário - Desmarcar Consulta

### Cenário Principal (Fluxo Principal)
1. O usuário acessa a tela para Desmarcar Consulta.
2. O sistema exibe uma lista de consultas agendadas.
3. O usuário seleciona a consulta que deseja desmarcar.
4. O sistema solicita uma confirmação para o cancelamento.
5. O usuário confirma o cancelamento.
6. O sistema desmarca a consulta e notifica o sucesso da operação.

### Cenário Alternativo 1 - Consulta Não Encontrada
1. O usuário tenta desmarcar uma consulta que não está agendada.
2. O sistema exibe uma mensagem informando que nenhuma consulta foi encontrada.
3. O usuário é redirecionado para a tela de Visualizar Consultas Agendadas.

### Cenário Alternativo 2 - Consulta Já Desmarcada
1. O usuário tenta desmarcar uma consulta já cancelada.
2. O sistema exibe uma mensagem informando que a consulta já foi desmarcada.
3. O usuário é redirecionado para a tela de Visualizar Consultas Agendadas.

---

### 3.3 Casos de Uso - Funcionário UBS
### Caso de Uso: Funcionário UBS - Login

#### Cenário Principal (Fluxo Principal)
1. O funcionário acessa a tela de login.
2. O funcionário escolhe a forma de login (via Gov.br ou diretamente pelo sistema).
3. O sistema valida as credenciais do funcionário.
4. Se a autenticação for bem-sucedida, o funcionário é redirecionado para a tela principal, onde pode:
   - Gerenciar agendas médicas.
   - Realizar agendamentos.
   - Cancelar consultas.

#### Cenário Alternativo 1 - Funcionário Não Cadastrado
1. O funcionário tenta realizar o login com um CPF e senha que não correspondem a um cadastro existente.
2. O sistema exibe uma mensagem de erro informando que as credenciais não são válidas.
3. O sistema oferece as opções de Cadastro ou Recuperação de Senha.
4. O funcionário é redirecionado para a tela de Cadastro ou Recuperação de Senha.
5. Após concluir o processo, o funcionário pode realizar o login novamente.

#### Cenário Alternativo 2 - Dados de Login Incorretos
1. O funcionário insere um CPF e senha incorretos.
2. O sistema exibe uma mensagem de erro solicitando que o funcionário verifique os dados inseridos.
3. O funcionário tem as opções de:
   - Tentar novamente.
   - Recuperar a senha.

---

### Caso de Uso: Funcionário UBS - Gerenciar Agenda do Médico

#### Cenário Principal (Fluxo Principal)
1. O funcionário acessa a tela de Agenda do Médico.
2. O funcionário seleciona um médico da lista disponível.
3. O sistema exibe a agenda atual do médico.
4. O funcionário preenche a agenda com horários disponíveis para consultas.
5. O sistema atualiza a agenda do médico.

#### Cenário Alternativo 1 - Não Há Agenda Disponível para o Mês
1. O funcionário tenta adicionar horários à agenda do médico para o mês.
2. O sistema verifica que não há mais horários disponíveis.
3. O sistema exibe uma mensagem informando que o mês está cheio e oferece a opção:
   - Adicionar horários para o próximo mês.
4. O funcionário escolhe entre adicionar horários para o próximo mês ou sair da tela.

#### Cenário Alternativo 2 - Horário de Consulta Já Foi Preenchido
1. O funcionário tenta agendar uma consulta para um horário reservado.
2. O sistema exibe uma mensagem de erro informando que o horário já foi preenchido.
3. O funcionário pode:
   - Escolher outro horário.
   - Voltar à lista de horários disponíveis.



## 4. Requisitos Não Funcionais
* **Acessibilidade**: Interface intuitiva para usuários com diferentes níveis de alfabetização digital.
* **Desempenho**: Respostas rápidas, mesmo em condições de baixa largura de banda.
* **Segurança**: Autenticação robusta e proteção dos dados dos usuários.
* **Escalabilidade**: Suporte a um grande volume de usuários simultâneos.
* **Integração com o Gov.br para Autenticação**:
  * O sistema integra-se à plataforma Gov.br para permitir o login seguro dos usuários (pacientes e funcionários UBS) utilizando suas credenciais do governo federal.
  * A autenticação via Gov.br segue as especificações de segurança e privacidade exigidas pela plataforma, garantindo a integridade dos dados do usuário.
  * O tempo de resposta da autenticação via Gov.br deve ser inferior a 5 segundos.
* **Integração com o RNDS (Rede Nacional de Dados em Saúde)**:
  * O sistema integra-se à API do RNDS para acessar dados de saúde relevantes para os pacientes, como histórico de consultas, exames realizados, entre outros.
  * A consulta de dados via RNDS deve ser feita de forma eficiente e segura, respeitando a privacidade e as normas de segurança da informação estabelecidas pela Lei Geral de Proteção de Dados (LGPD).
  * O tempo de resposta para acessar dados do RNDS deve ser inferior a 3 segundos.
  * O sistema deve garantir que apenas usuários autorizados possam acessar informações de saúde por meio da API, implementando autenticação e autorização adequadas.



## 5. Benefícios
* Redução de filas presenciais.
* Melhoria na eficiência do atendimento.
* Acesso remoto para agendamento, eliminando barreiras logísticas.
* Otimização da gestão de horários médicos nas UBS.
* Beneficiar a população.

## 6. Glossário
* SUS: Sistema Único de Saúde.
* UBS: Unidade Básica de Saúde.
* MarcaSus: Nome do sistema proposto, uma solução web e mobile para marcação de consultas.
* Usuário: Paciente que utiliza o sistema para gerenciar consultas.
* Funcionário UBS: Colaborador/profissional de saúde responsável por auxiliar no gerenciamento das agendas e suporte aos pacientes.
* Plataforma Web Responsiva: A versão do sistema acessada por meio de navegadores de internet, adaptável a diferentes tamanhos de tela, seja em desktop ou dispositivos móveis.
* Plataforma Mobile: A versão do sistema é acessada através de dispositivos móveis, como smartphones e tablets. 
* Login via Gov.br: O processo de autenticação de usuários e funcionários utilizando a plataforma Gov.br, que permite um login seguro e integrado aos dados cadastrais dos usuários no Sistema Único de Saúde (SUS), garantindo maior * segurança e confiabilidade no acesso ao sistema.


