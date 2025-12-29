package com.lynx.orders.controller;


import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lynx.orders.dto.CreateOrderRequestDTO;
import com.lynx.orders.dto.OrderSummaryDTO;
import com.lynx.orders.entity.Order;
import com.lynx.orders.entity.OrderItem;
import com.lynx.orders.service.OrderService;

@RestController
@RequestMapping("/orders")

public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    //GET all orders
    @GetMapping
    public List<OrderSummaryDTO> getAllOrders(@RequestParam(required = false) Integer customerId) {
        return orderService.findAllSummary(customerId); 
        //resume without items
    }


    //GET order by id
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.findByIdWithItems(id); // traz pedido + itens
    }


    //Post create order with items
    @PostMapping
    public Order createOrderWithItems(@RequestBody CreateOrderRequestDTO request) {
        return orderService.createOrderWithItems(request);
    }

    //POST order item
    @PostMapping("/{id}")
    public OrderItem addOrderItem(@PathVariable Long id, @RequestBody OrderItem request){
        return orderService.addItemToOrder(id, request.getProductId(), request.getQuantity());
    }

    //DELETE order item
    @DeleteMapping("/{orderId}/delete/{itemId}")
    public void deleteOrderItem(@PathVariable Long orderId, @PathVariable Long itemId){
        orderService.deleteItemFromOrder(orderId, itemId);
    }
    //Change the status of an order to "CANCELLED"
    @PatchMapping("/{id}/cancel")
    public Order cancelOrder(@PathVariable Long id) {
        return orderService.cancelOrder(id);
    }
    //Made the route but I won't apply on the frontend, since I don't know if it's a good practice to delete orders.
    @DeleteMapping("/{id}/delete")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }
}
