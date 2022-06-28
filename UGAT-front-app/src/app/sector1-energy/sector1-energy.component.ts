import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector1-energy',
  templateUrl: './sector1-energy.component.html',
  styleUrls: ['./sector1-energy.component.css']
})
export class Sector1EnergyComponent implements OnInit {    

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
