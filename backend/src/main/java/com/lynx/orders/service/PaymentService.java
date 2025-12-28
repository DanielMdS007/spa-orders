package com.lynx.orders.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lynx.orders.entity.Payment;
import com.lynx.orders.repository.OrderItemRepository;
import com.lynx.orders.repository.OrderRepository;
import com.lynx.orders.repository.PaymentRepository;
import com.lynx.orders.entity.Order;
@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public List<Payment> findAll(){
        return paymentRepository.findAll();
    }

    public Payment create(Payment payment){
        //find order
        Order order = orderRepository.findById(payment.getOrderId())
        .orElseThrow(() -> new RuntimeException(
        "Order with ID " + payment.getOrderId() + " not found"
        ));
 

        // Verify if the associated order exists
        if (!orderRepository.existsById(payment.getOrderId())) {
            throw new RuntimeException("Order with ID " + payment.getOrderId() + " not found");
        }

        // Validate payment details
        if (payment.getAmountCents() <= 0) {
            throw new RuntimeException("Payment amount must be greater than zero.");
        }
        if(payment.getMethod() == null  || payment.getMethod().isEmpty()){ 
            throw new RuntimeException("Payment method is required.");
        }
        if( !"PIX".equals(payment.getMethod()) && !"CARD".equals(payment.getMethod()) && !"BOLETO".equals(payment.getMethod())){
            throw new RuntimeException("Payment method must be 'PIX', 'CARD' or 'BOLETO'.");
        }
        
        // Verify if the order can be paid with the given amount, if yes update order status to PAID
         Integer orderTotal = orderItemRepository.calculateOrderTotal(order.getId());

        if (orderTotal == null || orderTotal <= 0) {
            throw new RuntimeException("Order has no items.");
        }

        if (payment.getAmountCents() < orderTotal) {
            throw new RuntimeException("Payment amount is less than order total.");
        }
        order.setStatus("PAID");
        orderRepository.save(order);


        payment.setPaidAt(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    public Payment findById(Long id){
        return paymentRepository.findById(id).orElse(null); 
    }

}
