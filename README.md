# spa-orders
Code for a tecnical evaluation for a intern opportunity


Projects mission (in portuguese)

4 - Visão geral do problema
Você é responsável por uma mini aplicação de Gestão de Pedidos. Há clientes, produtos,
pedidos, itens do pedido e pagamentos.
5 - Esquema de Banco de Dados (SQL relacional)
• Para essa solução sugerimos uso do SQLite;
• As DDL de referência estão na sessão “8 – Anexos”.
6 - Projeto Backend (Java ou C#):
Endpoints REST:
• GET - lista produtos com filtros opcionais;
• GET - lista pedidos resumidos;
• GET /orders/{id} - detalhes do pedido (itens + total calculado);
• POST /orders - cria pedido com itens (valida produtos ativos e preços);
• POST /payments - registra pagamento para um pedido (atualiza status para
PAID se cobrir o total);
Regras avaliativas:
• Total do pedido = soma de quantity * unit_price_cents dos itens;
• Pedido só vai para PAID se a soma dos pagamentos for >= total;
• Impedir item de produto inativo.
• Tratamento de erros com mensagens claras.
7 - Projeto Frontend (HTML, CSS e Javascript)
• Listagem de produtos com busca;
• Filtro por categoria
• Toogle para “somente ativos”
• Carrinho local (JS) com itens (quantidade, subtotal) e totalizador
• Botão “Finalizar Pedido” que chama POST /orders e exibe número do pedido
• Página/Seção de Pedidos: lista últimos pedidos e detalhe ao clicar (chama
GET /orders/{id})
• Validações básicas (ex.: quantidade > 0, e-mail em formulários, etc.).
• UI simples, responsiva.