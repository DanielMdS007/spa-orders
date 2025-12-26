package com.lynx.orders.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lynx.orders.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(@Param("orderId") Long orderId);
    @Query("""
    SELECT SUM(oi.quantity * oi.unitPrice)
    FROM OrderItem oi
    WHERE oi.order.id = :orderId
    """)
    Double calculateOrderTotal(@Param("orderId") Long orderId);

}
