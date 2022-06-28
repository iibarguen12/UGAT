export class Sector2Transportation{
  public city: string ;
  public inventoryPeriod: string;
  public subSector: string ;
  public scope: string ;
  public diesel: number;
  public dieselUnit: string ;
  public gasoline: number;
  public gasolineUnit: string ;
  public naturalGas: number;
  public naturalGasUnit: string ;
  public lgn: number;
  public lgnUnit: string ;
  public propane: number;
  public propaneUnit: string ;
  public other: number;
  public otherUnit: string ;
  public otherDescription: string ;
  public electricity: number;
  public electricityUnit: string ;
  public userName: string ;
    
  constructor() {
    this.city = null;
    this.inventoryPeriod = null;
    this.subSector = null;
    this.scope = null;
    this.diesel = null;
    this.dieselUnit = null;
    this.gasoline = null;
    this.gasolineUnit = null;
    this.naturalGas = null;
    this.naturalGasUnit = null;
    this.lgn = null;
    this.lgnUnit = null;
    this.propane = null;
    this.propaneUnit = null;
    this.other = null;
    this.otherUnit = null;
    this.otherDescription = null;
    this.electricity = null;
    this.electricityUnit = null;
    this.userName = null;
  }
}