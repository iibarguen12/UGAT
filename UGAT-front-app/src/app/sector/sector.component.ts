import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  sectors= ['Stationary Energy', 'Transportation', 'Waste', 'IPPU', 'AFOLU', 'Totals']
  selectedSector:any
  constructor() { }

  ngOnInit(): void {
  }

  openSector(sector:any){
    this.selectedSector = sector
  }

}
