package com.lynx.orders.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lynx.orders.dto.CreateOrderRequestDTO;
import com.lynx.orders.dto.OrderSummaryDTO;
import com.lynx.orders.entity.Order;
import com.lynx.orders.repository.OrderRepository;
import com.lynx.orders.entity.OrderItem;
import com.lynx.orders.entity.Product;
import com.lynx.orders.repository.OrderItemRepository;

import org.springframework.transaction.annotation.Transactional;

import com.lynx.orders.repository.CustomerRepository;
import com.lynx.orders.repository.ProductRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, CustomerRepository customerRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository ) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }


    public List<OrderSummaryDTO> findAllSummary() {
        return orderRepository.findAll()
            .stream()
            .map(OrderSummaryDTO::new)
            .toList();
    }
    public Order create(Order order){
        
        if(order.getCustomerId() == null){
            throw new RuntimeException("Customer ID is required to create an order.");
        }
        //Check if customer exists could be added here with CustomerService
        if(!customerRepository.existsById(order.getCustomerId())){
            throw new RuntimeException("Customer with ID " + order.getCustomerId() + " does not exist.");
        }
        order.setCreatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    public Order findById(Long id){
        return orderRepository.findById(id).orElse(null); 
    }


    //Function with order Item

    @Transactional(readOnly = true)
    public Order findByIdWithItems(Long id){
        Order order = orderRepository.findById(id).orElse(null);
        if(order != null){
            // Force loading of items
            order.getItems().size(); 
        }
        return order;
    }

    @Transactional
    public OrderItem addItemToOrder(Long orderId, Long productId, Integer quantity) {
        // search for order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // serach for product
        Product product = productRepository.findById(productId)
        .orElseThrow(() -> new RuntimeException("Product not found"));

        if(product.getActive() == 0){
            throw new RuntimeException("Product is not active.");
        }

        // Validating quantity
        if (quantity == null || quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero.");
        }
        
        // Create OrderItem
        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setProductId(productId);
        item.setQuantity(quantity);
        item.setUnitPrice(product.getPrice()); 

        //Validations
        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero.");
        }
        if (item.getUnitPrice() <= 0) {
            throw new RuntimeException("Unit price must be greater than zero.");
        }
        if (productId == null) {
            throw new RuntimeException("Product ID is required.");
        }
        if (orderId == null) {
            throw new RuntimeException("Order ID is required.");
        }
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product with ID " + productId + " not found.");
        }
        if (!orderRepository.existsById(orderId)) {
            throw new RuntimeException("Order with ID " + orderId + " not found.");
        }

        // Save item
        orderItemRepository.save(item);

        // 4. Update the order's item list (if using LAZY)
        order.getItems().add(item);

        return item;
    }
    // Function with order that add items to order while making the order
    @Transactional
    public Order createOrderWithItems(CreateOrderRequestDTO request) {

        // DTO to Entity
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setStatus("NEW");
        order.setCreatedAt(LocalDateTime.now());

        if (!customerRepository.existsById(order.getCustomerId())) {
            throw new RuntimeException("Customer not found");
        }

        order = orderRepository.save(order);
        // Add items to order
        if (request.getItems() != null) {
            for (var item : request.getItems()) {
                addItemToOrder(
                    order.getId(),
                    item.getProductId(),
                    item.getQuantity()
                );
            }
        }

        return order;
    }

}
