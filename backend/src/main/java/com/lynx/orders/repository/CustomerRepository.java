package com.lynx.orders.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lynx.orders.entity.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Long> {    
    Optional<Customer> findByEmail(String email);

}
