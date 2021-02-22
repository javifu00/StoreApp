import { Products } from './../../models/products';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-product',
  templateUrl: './selected-product.component.html',
  styleUrls: ['./selected-product.component.scss']
})
export class SelectedProductComponent implements OnInit {

  productId: string = "";
  product: Products = null;
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute) { 
      this.getParamId()
    }

  ngOnInit(): void {
    this.findPostById();;
  }

  getParamId(): void {
    this.router.paramMap.subscribe((params) => {
      this.productId = params.get('postId');
    });
  }

  findPostById(): void {
    if (this.productId) {
      this.productService.getPostById(this.productId).subscribe((product) => {
        this.product = product;
        this.isLoading = false;
      });
    }
  }

}
