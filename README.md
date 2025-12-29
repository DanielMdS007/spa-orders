# spa-orders
Code for a tecnical evaluation for a intern opportunity, 
[For de evaluators ]the reason why everything is in english is to share this evaluation to more people in the future, being from or outside of brazil

Technologies used
Project was made using HTML, CSS, JavaScript with Bootstrap in front-end, and Java with Spring Boot in the back-end.

I would like to thank Lynx for the opportunity to participate in this technical evaluation process. I really enjoyed working on this project and reinforcing my skills.

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

