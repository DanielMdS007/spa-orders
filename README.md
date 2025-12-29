# spa-orders
Code for a tecnical evaluation for a intern opportunity, 
[For de evaluators ]the reason why everything is in english is to share this evaluation to more people in the future, being from or outside of brazil


Projects mission (translated to english by chatgpt)

4 – Problem Overview
You are responsible for a mini Order Management application. There are customers, products, orders, order items, and payments.

Software used
Backend: Java + Springboot
Frontend: Html, Css, JavaScript + Bootstrapp
Database: Mysqlite
6 – Backend Project (Java or C#):
REST Endpoints:
• GET – list products with optional filters; ✓
• GET – list summarized orders; DONE
• GET /orders/{id} – order details (items + calculated total); ✓
• POST /orders – create an order with items (validate active products and prices); ✓
• POST /payments – register a payment for an order (update status to PAID if it covers the total); ✓

Evaluation Rules:
• Order total = sum of quantity * unit_price_cents of the items; ✓
• An order is marked as PAID only if the sum of payments is ≥ total; ✓
• Prevent adding items for inactive products; ✓
• Error handling with clear messages. v

7 – Frontend Project (HTML, CSS, and JavaScript)
• Product listing with search; ✓
• Category filter; ✓
• Toggle for “active only”; ✓
• Local cart (JS) with items (quantity, subtotal) and total; ✓
• “Checkout” button that calls POST /orders and displays the order number;✓
• Orders page/section: list recent orders and show details on click (calls
GET /orders/{id});✓
• Basic validations (e.g., quantity > 0, email in forms, etc.);✓
• Simple, responsive UI.✓

Projects mission in portuguese 
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