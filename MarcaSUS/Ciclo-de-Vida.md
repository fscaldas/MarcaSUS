## Ciclo de Vida do Marcasus 
### Definindo o estado atual de cada requisito do sistema:

**Requisitos que se encontram Documentados:**

Login (autenticação); Marcar Consulta; Desmarcar Consulta; Visualizar Consultas; Preencher Agenda do Médico (funcionários UBS); Visualizar Agenda (funcionários UBS).

**Requisitos Excluídos:**

Enviar Notificações

---
### Tabela de Atributos

| Requisito                | Descrição | ID  | Complexidade  | Responsável  | Testado  | Implementado  | Estado |
|--------------------------|-----|-----|-----|-----|-----|-----|-----|
| Marcar Consulta    |Permite agendar consultas médicas. | RF1  | Baixa  | Fernanda  | Não  | Sim  |  Implementado & Documentado  |
| Desmarcar Consulta |Cancela consultas previamente agendadas. |RF2  | Baixa  | Fernanda  | Não  | Sim  |  Implementado & Documentado  |
| Visualizar Consulta|Exibe uma lista das consultas confirmadas. |RF3  | Baixa  | Fernanda  | Não  | Sim  |  Implementado & Documentado  |
| Preencher Agenda   |Adiciona e organiza horários disponíveis para consultas. |RF4  | Baixa  | Fernanda  | Não  | Sim  |  Implementado & Documentado  |
| Visualizar Agenda  |Visualiza a agenda preenchida. |RF5  | Baixa  | Fernanda  | Não  | Sim  |  Implementado & Documentado  |


### Tabela de Matriz de Rastreabilidade

| Requisito                                | P  | OP  | EU | Q   | W  |
|------------------------------------------|----|----|----|----|----|
| RF1 - Marcar Consulta                    | ✅ | ✅ | ✅ |   | ✅ |
| RF2 - Desmarcar Consulta                 | ✅ | ✅ | ✅ |   | ✅ |
| RF3 - Visualizar Consultas               | ✅ | ✅ | ✅ |   | ✅ |
| RF4 - Preencher Agenda do Médico (UBS)   | ✅ | ✅ | ✅ |   |   |
| RF5 - Visualizar Agenda (UBS)            | ✅ | ✅ | ✅ |   |   |

**Legenda:**
- **Pesquisa (P)** – Pesquisa online.
- **Observação de Processos (OP)** – Análise do fluxo de atendimento nas UBS.
- **Entrevistas com Usuários (EU)** – Conversas com pacientes, médicos e funcionários.
- **Questionários (Q)** – Formulários aplicados a usuários para entender dificuldades.
- **Workshops (W)** – Discussões com stakeholders para alinhar expectativas.
