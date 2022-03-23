import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'projects/ngx-csv-parser/src/public-api';
import { NgxCSVParserError } from 'projects/ngx-csv-parser/src/public-api';
import { FormGroup, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import {OrdersService} from '../app/orders.service'

import {
  ReactiveFormsModule,
  FormsModule,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  csvRecords: any[] = [];
  csvRecords1: any[] = [];
  header: boolean = true;
  emailid;
  //formdata;
  price;
  quantity;
  product;
  person;
  fileName= 'OrderList.xlsx';
  p_name = "";
  product_name = "";
  product_price;
  product_quantity;

  constructor(private ngxCsvParser: NgxCsvParser, private order:OrdersService) {
  }

  
  orderData = {};
  ngOnInit():void{
    this.order.getOrderList().subscribe((allData)=>{
      console.log(allData);
      this.orderData = allData;
    })
  }

  formdata = new FormGroup({
    quantity: new FormControl(""),
    price: new FormControl(""),
    person: new FormControl(""),
    product: new FormControl(""),
    
  });

  @ViewChild('fileImportInput') fileImportInput: any;
  @ViewChild('fileImportInput1') fileImportInput1: any;


  //for customer csv file
  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;

    this.ngxCsvParser.parse(files[0], {delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }
  //for product csv file
  fileChangeListener1($event: any): void {

    const files1 = $event.srcElement.files;

    this.ngxCsvParser.parse(files1[0], {delimiter: ',' })
      .pipe().subscribe((result1: Array<any>) => {
        console.log('Result1', result1);
        this.csvRecords1 = result1;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  exportexcel(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  saveData(){
    this.order.saveOrderData(this.formdata.value).subscribe((result)=>{
      console.log(result);
      this.formdata.reset()
    });
  }

}
