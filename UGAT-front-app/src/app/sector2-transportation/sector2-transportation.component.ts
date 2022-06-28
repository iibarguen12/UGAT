import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector2-transportation',
  templateUrl: './sector2-transportation.component.html',
  styleUrls: ['./sector2-transportation.component.css']
})
export class Sector2TransportationComponent implements OnInit {

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
