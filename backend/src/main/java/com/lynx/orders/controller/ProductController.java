package com.lynx.orders.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lynx.orders.entity.Product;
import com.lynx.orders.service.ProductService;

@RestController
@RequestMapping("/products")

public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //GET
    @GetMapping
    public List<Product> getAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer active
    ) {
        return productService.findAll(category, active);
    }

    //GET
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id){
        return productService.findById(id);
    }
    
    //POST
    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product){
        Product saved = productService.create(product);
        //maybe I will have to add this to every POST method to return 201 instead of 200
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    /*NOT REQUIRED FOR THE EVALUATION
    I wanted to add these methods but I think I will waste time since it's techinically not required for the evaluation
    maybe later if I want to improve the project in the future
    //PATCH
    @PatchMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Product product = productService.findById(id);
        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        updates.forEach((key, value) -> {
            switch (key) {
                case "name" -> product.setName((String) value);
                case "category" -> product.setCategory((String) value);
                case "price" -> product.setPrice(((Number) value).doubleValue());
                case "active" -> product.setActive(((Number) value).intValue());
            }
        });
        
        return productService.update(product);
    }
    //DELETE
    @DeleteMapping("/{id}") 
    public void delete(@PathVariable Long id){
        try {
            productService.delete(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
    }
    */
}
