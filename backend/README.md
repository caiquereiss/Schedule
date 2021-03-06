## Recuperão de senha

**RequisitosFuncionais**

[X] O usuário deve poder recuperar sua senha informando o e-mail;
[X] O usuário deve receber um e-mail com instruções de recuperção de senha;
[X] O usuário deve poder resetar sua senha;

**RequisitosNãoFuncionais**
[/] Utilizar Mailtrap para testar envios em ambiente de dev;

- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job) --fila--

**RegrasDeNegocios**

[X] O link enviado por email para resetar senha, deve expirar em 2h;
[X] O usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização do perfil

**RF**
[X] O usuário deve poder atualizar seu nome, email e perfil;

**RN**

[X] O usuário não pode alterar seu email para um email ja cadastrado;
[X] Para atualizar sua senha, o usuário deve informar a senha antiga;
[] Para atualizar sua senha, o usuário precisa confirmar a nova senha;

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
[X] O usuário deve poder listar todos os prestadores de servicos cadastrados;

- O usuário deve poder listar os dias de um mes com pelo menos um horário disponivel de um prestador;
- O usuário deve poder listar os horários disponiveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

[X] Cada agendamento deve durar 1h;
[X] Os agendamentos devem estar disponíveis entre 8h ás 18hr(Primeiro ás 8h, último ás 17hr);
[X] O usuário não pode agendar em um horário já ocupado;
[X] O usuário não pode agendar em um horário que já passou;
[X] O usuário não pode agendar servicos consigo mesmo;



// Validar a respeito do redis e do cache no config
