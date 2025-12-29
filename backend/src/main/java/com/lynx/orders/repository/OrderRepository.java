package com.lynx.orders.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lynx.orders.entity.Order;


public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Integer customerId);
}
