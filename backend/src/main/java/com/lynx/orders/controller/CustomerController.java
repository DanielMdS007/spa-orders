package com.lynx.orders.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lynx.orders.entity.Customer;
import com.lynx.orders.service.CustomerService;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/customers")

public class CustomerController {
    private final CustomerService customerService;
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    
    //GET
    @GetMapping
    public List<Customer> getAll(){
        return customerService.findAll();
    }

    //GET
    @GetMapping("/{id}")
    public Customer getById(@PathVariable Long id){
        return customerService.findById(id);
    }
    
    //POST
    @PostMapping
    public Customer create(@RequestBody Customer customer){
        return customerService.create(customer);
    }

    
}
