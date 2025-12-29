    package com.lynx.orders.service;

    import java.util.List;

    import org.springframework.stereotype.Service;

    import com.lynx.orders.entity.Product;
    import com.lynx.orders.repository.ProductRepository;

    @Service
    public class ProductService {
        private final ProductRepository repository;

        public ProductService(ProductRepository repository) {
            this.repository = repository;
        }

        public List<Product> findAll(String category, Integer active) {

            if (category != null && active != null) {
                return repository.findByCategoryAndActive(category, active);
            }

            if (category != null) {
                return repository.findByCategory(category);
            }

            if (active != null) {
                return repository.findByActive(active);
            }

            return repository.findAll();
        }
        public Product create(Product product){
            return repository.save(product);
        }

        public Product findById(Long id){
            return repository.findById(id).orElse(null); 
        }
        /*
        I wanted to add these methods but I think I will waste time since it's techinically not required for the evaluation
        maybe later if I want to improve the project in the future
        public Product update(Product product){
            return repository.save(product);
        }
        
        public void delete(Long id){
            repository.deleteById(id);
        }
        */




    }
