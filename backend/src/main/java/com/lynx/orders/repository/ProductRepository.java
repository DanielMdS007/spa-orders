package com.lynx.orders.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lynx.orders.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);

    List<Product> findByActive(int active);

    List<Product> findByCategoryAndActive(String category, int active);

}