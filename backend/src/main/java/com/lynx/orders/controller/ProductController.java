package com.lynx.orders.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
    
    //PATCH
    @PatchMapping("/{id}")
    public ResponseEntity<Product> updatePartial(
        @PathVariable Long id,
            @RequestBody Product patch) {

        Product product = productService.findById(id);
        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        if (patch.getName() != null) {
            product.setName(patch.getName());
        }
        if (patch.getCategory() != null) {
            product.setCategory(patch.getCategory());
        }
        if (patch.getPrice() != null) {
            product.setPrice(patch.getPrice());
        }
        if (patch.getActive() != null) {
            product.setActive(patch.getActive());
        }

        Product saved = productService.update(product);
        return ResponseEntity.ok(saved);
    }
    

    //DELETE
    @PostMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
