import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url = "http://localhost:3000/fields"

  constructor(private http: HttpClient) {}
    getOrderList(){
      return this.http.get(this.url);
  }
  saveOrderData(data:any){
    console.log(data);
    return this.http.post(this.url, data);
  }
}
