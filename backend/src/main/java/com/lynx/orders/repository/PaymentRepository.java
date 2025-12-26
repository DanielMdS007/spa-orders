package com.lynx.orders.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lynx.orders.entity.Payment;


public interface PaymentRepository extends JpaRepository<Payment, Long> {
}