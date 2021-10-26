## Recuperão de senha

**RequisitosFuncionais**

- O usuário deve poder recuperar sua senha informando o e-mail;
- O usuário deve receber um e-mail com instruções de recuperção de senha;
- O usuário deve poder resetar sua senha;

**RequisitosNãoFuncionais**
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job) --fila--


**RegrasDeNegocios**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização do perfil
**RF**
- O usuário deve poder atualizar seu nome, email e perfil;

**RN**

- O usuário não pode alterar seu email para um email ja cadastrado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;


# Painel do prestador
**RF**

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notifições não lidas;


**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io


**RN**
- A notificação deve ter um status de lido ou não lido, para que o prestador possa controlar;

# Agendamento de servicos

**RF**
- O usuário deve poder listar todos os prestadores de servicos cadastrados;
- O usuário deve poder listar os dias de um mes com pelo menos um horário disponivel de um prestador;
- O usuário deve poder listar os horários disponiveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h;
- Os argumentos devem estar disponíveis entre 8h ás 18hr(Primeiro ás 8h, último ás 17hr);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar servicos consigo mesmo;



