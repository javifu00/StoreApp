import { Products } from './../../models/products';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  constructor( private productsService: ProductService) { }

  ngOnInit(): void {}

}
