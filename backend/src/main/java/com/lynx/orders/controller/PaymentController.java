package com.lynx.orders.controller;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lynx.orders.entity.Payment;
import com.lynx.orders.service.PaymentService;

@RestController
@RequestMapping("/payments")

public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    //GET
    @GetMapping
    public List<Payment> getAll(){
        return paymentService.findAll();
    }


    //GET
    @GetMapping("/{id}")
    public Payment getById(@PathVariable Long id){
        return paymentService.findById(id);
    }
    
    //POST
    @PostMapping
    public Payment create(@RequestBody Payment payment){
        return paymentService.create(payment);
    }
    

}
