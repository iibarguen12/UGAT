import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector4-ippu',
  templateUrl: './sector4-ippu.component.html',
  styleUrls: ['./sector4-ippu.component.css']
})
export class Sector4IPPUComponent implements OnInit {

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
