import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Products } from './../../models/products';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss']
})
export class NewProductFormComponent implements OnInit {

  productForm: FormGroup;

  productToUpdate: Products = null;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      const productID = params.get('productID');

      if (productID) {
        this.productService.getPostById(productID).subscribe((product) => {
          this.productToUpdate = product;
          this.productForm.patchValue({
            title: this.productToUpdate.title,
            body: this.productToUpdate.body,
            category: this.productToUpdate.category,
            price: this.productToUpdate.price,
          });
          this.isLoading = false;
        });
        return;
      }

      this.isLoading = false;
    });
  }

  buildForm(): void {
    this.productForm = this.fb.group({
      title: '',
      summary: '',
      body: '',
      photo: '',
      category: '',
    });
  }

  onSubmit(): void {
    const newProduct: Products = {
      title: this.productForm.get('title').value,
      body: this.productForm.get('body').value,
      category: this.productForm.get('category').value,
      price: this.productForm.get('price').value,
    };

    if (this.productToUpdate) {
      this.updateProduct(newProduct);
      return;
    }

    this.createNewPost(newProduct);
  }

  createNewPost(newPost: Products): void {
    this.productService.createNewProduct(newPost).then((response) => {
      console.log('response', JSON.stringify(response, null, 4));
      this.router.navigate(['/posts']);
    });
  }

  updatePost(postData: Products): void {
    this.productService.updateProduct(this.productToUpdate.id, postData).then(() => {
      this.router.navigate(['/posts']);
    });
  }

  deletePost(): void {
    if (this.productToUpdate) {
      this.productService.deleteProduct(this.productToUpdate.id).then(() => {
        this.router.navigate(['/posts']);
      });
    }
  }

}
