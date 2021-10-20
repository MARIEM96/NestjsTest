import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  constructor(private httpService: HttpService) {}

  findAll(id: number): Observable<Product[]> {
    return this.httpService.get('https://world.openfoodfacts.org/api/v0/product/'+id+'.json');
  }
  getProducts() {
    return [...this.products];
  }

   findProduct(id: number): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod._id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
