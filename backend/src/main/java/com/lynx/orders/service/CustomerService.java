package com.lynx.orders.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lynx.orders.entity.Customer;
import com.lynx.orders.repository.CustomerRepository;

@Service
public class CustomerService {
    private final CustomerRepository repository;
    

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> findAll(){
        return repository.findAll();
    }

    public Customer create(Customer customer){
        //email verification unique not working, need to look at that after finishing the endpoints
        if (repository.findByEmail(customer.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado"); 
        }

        customer.setCreatedAt(LocalDateTime.now());
        return repository.save(customer);
    }

    public Customer findById(Long id){
        return repository.findById(id).orElse(null); 
    }

    
}
