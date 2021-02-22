import { Products } from './../models/products';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Products>;

  constructor(private firestore: AngularFirestore) { 

    this.productsCollection = this.firestore.collection<Products>("products", (ref) =>
    ref.orderBy('title'));

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

  /**
   * GET POST BY ID
   * @param productId
   */
  getPostById(productId: string): Observable<Products> {
    return this.productsCollection
      .doc<Products>(productId)
      .snapshotChanges()
      .pipe(
        map((product) => {
          return {
            id: product.payload.id,
            ...product.payload.data(),
          };
        })
      );
  }


  /**
   * CREATE NEW POST
   * @param newProduct
   */
  createNewProduct(newProduct: Products): Promise<DocumentReference> {
    return this.productsCollection.add(newProduct);
  }

  /**
   * UPDATE POST BY ID
   * @param productId
   * @param productData
   */
  updateProduct(productId: string, productData: Products): Promise<void> {
    return this.productsCollection.doc<Products>(productId).update(productData);
  }

  /**
   * DELETE POST BY ID
   * @param productId
   */
  deleteProduct(productId: string): Promise<void> {
    return this.productsCollection.doc<Products>(productId).delete();
  }
}

}
