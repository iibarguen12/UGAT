import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector5-afolu',
  templateUrl: './sector5-afolu.component.html',
  styleUrls: ['./sector5-afolu.component.css']
})
export class Sector5AFOLUComponent implements OnInit  {

  selectedOption:any
  options= ['Add Info', 'Show Info']
  openOption(option:any){
    this.selectedOption = option
  }

  constructor() {    
  } 

  ngOnInit(): void {
  }

}
