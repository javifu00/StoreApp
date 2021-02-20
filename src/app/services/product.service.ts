import { Products } from './../models/products';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Products>;

  constructor(private firestore: AngularFirestore) { 

    this.productsCollection = this.firestore.collection<Products>("products");

  }


  getAllProducts(): Observable<Products[]> {
    return this.productsCollection.snapshotChanges().pipe(
      map((product) => {
        return product.map((product) => ({
          id: product.payload.doc.id,
          ...product.payload.doc.data(),
        }));
      })
    );
  }

}
