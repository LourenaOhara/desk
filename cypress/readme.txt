Critérios de Aceite - Refatoração do Desk Web
1 Recebimento de tickets
- Contador de clientes aguardando deve ser atualizado conforme a contagem de tickets abertos OK
- Botão “Atender novo cliente”: Se o cliente clicar em “Atender novo cliente” e houverem tickets para 
serem distribuídos, o ticket deverá cair na listagem OK
- Distribuição automática:
- Caso o bot tenha distribuição automática, novos tickets criados deverão cair na listagem de tickets
- Ao receber novos tickets, o Desk deverá exibir a notificação do navegador e aviso sonoro, caso a aba não 
esteja selecionada OK


2 Finalização e Transferência do ticket pelo gestor/cliente
- Se o atendente estiver com o ticket aberto na tela, deverá ser exibido o modal de “finalizado pelo gestor” 
e o ticket será removido da listagem
- Se o atendente não estiver com o ticket aberto na tela, o ticket continuará na listagem até que o atendente 
clique no ticket (com um indicador de mensagem não lida). Ao clicar no ticket, o modal de “finalizado pelo 
gestor” será exibido na tela e o ticket será removido da listagem.
- Para transferência, o comportamento será igual o de fechamento, com a diferença de que o modal exibido será 
de “ticket transferido pelo gestor”


3 Finalização e Transferência do ticket pelo atendente
Ao transferir:
- Será exibido um modal de seleção da equipe OK
- Após a seleção da equipe, será exibido um modal de Atendimento Finalizado PK
- O ticket será removido da listagem e da tela OK
Ao Finalizar:
- Será exibido o modal de confirmação de finalização (que pode exibir tags ou não) OK
- Ao ser finalizado, será exibido um modal de atendimento finalizado OK
- O ticket será removida da listagem e da tela OK


4 Recebimento de mensagens:
Ticket selecionado:
- Novas mensagens recebidas deverão ser listadas na thread na ordem em que foram enviadas
Ticket que não está selecionado:
- Quando o ticket não selecionado receber mensagens, o indicador de mensagens não lidas deverá ser atualizado 
com a quantidade de mensagens recebidas
- Ao clicar no ticket, o contador deverá ser limpo e as mensagens deverão ser listadas na thread na ordem em 
que foram enviadas
- A listagem de tickets será paginada através de um scroll infinito com 50 mensagens de cada vez


5 Envio de mensagens:
- As mensagens enviadas devem ser listadas na thread OK
- As mensagens devem chegar para o cliente na ordem em que foram enviadas OK


6 Reconexão:
- Ao realizar reconexão, o status do atendente deve ser mantido com o último estado antes da desconexão
- Após a reconexão, todas as mensagens posteriores à última mensagem recebida do ticket atual devem ser baixadas 
do servidor e listadas na thread
- Ao clicar em um outro ticket, ele deve buscar as mensagens que foram recebidas durante o período de desconexão
- As mensagens buscadas após a reconexão devem estar ordenadas


7 Funcionalidade de adicionar tags deve funcionar corretamente OK


8 Funcionalidade de adicionar comentários deve funcionar corretamente OK
