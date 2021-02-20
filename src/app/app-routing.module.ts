import { NewProductFormComponent } from './pages/new-product-form/new-product-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "products", component: ProductsComponent },
  { path: "products/:id", component: ProductsComponent },
  { path: "products/create", pathMatch: "full", component: NewProductFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
