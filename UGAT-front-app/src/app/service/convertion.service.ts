import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ConvertionService {
    /*Constants for Sectors*/
    public SECTOR1 = "ENERGY";
    public SECTOR2 = "TRANSPORTATION";
    public SECTOR3 = "WASTE";
    public SECTOR4 = "IPPU";
    public SECTOR5 = "AFOLU";

    /*Constants for Units to TJ*/
    private ligniteBrownCoal =84.0336134;
    private anthracite =37.4531835;
    private cokingCoal =35.4609929;
    private residualFuelOil =24.7524752;
    private dieselOil =23.255814;
    private motorGasoline =23.25894;
    private naturalGas =28.833333;
    private lng = 20.833333;
    private propane = 19.049493;
    private crudeOil =23.6406619;
    private orimulsion =36.3636364;
    private naturalGasLiquid =20.8333333;
    private jetGasoline =22.5733634;
    private jetKerosene =22.675737;
    private otherKerosene =22.8310502;

    /*Constants for Emission factors*/
    /*Default CO2*/
    private dieselOilCO2 = 74100;    
    private gasolineOilCO2 = 69300;
    private naturalGasOilCO2 = 56100;
    private lgnOilCO2 = 64800;
    private propaneOilCO2 = 60000;        

    /*Emission factors in gr CO2e/kWh per Year*/
    private emForDefault = 24;
    private emFor2016 = 24;
    private emFor2017 = 24;
    private emFor2018 = 25;
    private emFor2019 = 23;
    private emFor2020 = 24;
    private emFor2021 = 24;

    public tonsToTCO2e(sector: string, scope: number, inventoryYear: number, valueInTons: number, column: string = 'empty', population: number = 0, 
    diesel: number = 0, gasoline: number = 0, naturalGas: number = 0, lgn : number = 0, propane : number = 0)
    : number{

        if (this.isNull(valueInTons)){
            valueInTons = 0;
        }

        if (sector == this.SECTOR1 || sector == this.SECTOR2 ){
            if (scope == 1){
                let tCO2:any = 0;
                switch(column){
                    case "diesel":
                        tCO2 = (valueInTons / this.dieselOil)*(this.dieselOilCO2/1000);
                        break;
                    case "gasoline":
                        tCO2 = (valueInTons / this.motorGasoline)*(this.gasolineOilCO2/1000);
                        break;
                    case "naturalGas":
                        tCO2 = (valueInTons / this.naturalGas)*(this.naturalGasOilCO2/1000);
                        break;
                    case "lgn":
                        tCO2 = (valueInTons / this.lng)*(this.lgnOilCO2/1000);
                        break;
                    case "propane":
                        tCO2 = (valueInTons / this.propane)*(this.propaneOilCO2/1000);
                        break;
                    case "electricity":
                        tCO2 = 0;
                        break;
                    case "other":
                        tCO2 = (diesel / this.dieselOil)*(this.dieselOilCO2/1000) +
                               (gasoline / this.motorGasoline)*(this.gasolineOilCO2/1000) +
                               (naturalGas / this.naturalGas)*(this.naturalGasOilCO2/1000) +
                               (lgn / this.lng)*(this.lgnOilCO2/1000) +
                               (propane / this.propane)*(this.propaneOilCO2/1000) ;
                        break;
                    default:
                        null;
                }                                
                return Number(tCO2.toFixed(3));
            }else if (scope == 2){
                let tCO2e = 0;
                switch (inventoryYear){
                    case 2016:
                        tCO2e = (valueInTons*this.emFor2016/1000)/1000;
                        break;
                    case 2017:
                        tCO2e = (valueInTons*this.emFor2017/1000)/1000;
                        break;
                    case 2018:
                        tCO2e = (valueInTons*this.emFor2018/1000)/1000;
                        break;
                    case 2019:
                        tCO2e = (valueInTons*this.emFor2019/1000)/1000;
                        break;
                    case 2020:
                        tCO2e = (valueInTons*this.emFor2020/1000)/1000;
                        break;
                    case 2021:
                        tCO2e = (valueInTons*this.emFor2021/1000)/1000;
                        break;
                    default:
                        tCO2e = (valueInTons*this.emForDefault/1000)/1000;
                }
                return Number(tCO2e.toFixed(3));
            }
        }else if (sector == this.SECTOR3){
            if (column == "WasteWater"){
                /*let tCH4 = 0.00160817 * population;
                let tN2O = 0.00007622938 * population;
                let tSum = (tCH4*21)+(tN2O*310);*/
                let tSum = 0.284192467*population;
                return Number(tSum.toFixed(3));
            }else if (column == "OrganicFraction"){
                /*let tSum = valueInTons * 0.0065 * 21;*/
                let tSum = 0.284192467*population;
                return Number(tSum.toFixed(3));
            }else{
                return 0;
            }
        }
        return valueInTons;
    }

    public isNull(x: any): boolean{
      if (x== "" || x == null || x === null || typeof x === 'undefined') {
        return true;
      }
      return false;
    }

}