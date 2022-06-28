import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector3-waste',
  templateUrl: './sector3-waste.component.html',
  styleUrls: ['./sector3-waste.component.css']
})
export class Sector3WasteComponent implements OnInit {

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
