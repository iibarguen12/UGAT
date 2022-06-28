import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sector1Energy } from '../model/sector1-energy';
import { CustomHttpRespone } from '../model/custom-http-response';

@Injectable({providedIn: 'root'})
export class Sector1EnergyService {
    private host = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getAllSector1(): Observable<Sector1Energy[]> {
        return this.http.get<Sector1Energy[]>(`${this.host}/sector1Energy/list`);
    }

    public getSector1ById(id: number): Observable<Sector1Energy> {
        return this.http.get<Sector1Energy>(`${this.host}/sector1Energy/find/id/${id}`);
    }
    
    public getAllSector1BySubSector(subSector: string): Observable<Sector1Energy[]> {
        return this.http.get<Sector1Energy[]>(`${this.host}/sector1Energy/find/subSector/${subSector}`);
    }

    public getAllSector1ByScope(scope: string): Observable<Sector1Energy[]> {
        return this.http.get<Sector1Energy[]>(`${this.host}/sector1Energy/find/scope/${scope}`);
    }

    public addSector1(formData: FormData): Observable<Sector1Energy> {
        return this.http.post<Sector1Energy>(`${this.host}/sector1Energy/add`, formData);
    }

    public updateSector1(formData: FormData): Observable<Sector1Energy> {
        return this.http.post<Sector1Energy>(`${this.host}/sector1Energy/update`, formData);
    }

    public deleteSector1(id: number): Observable<CustomHttpRespone> {
        return this.http.delete<CustomHttpRespone>(`${this.host}/sector1Energy/delete/${id}`);
    }

    public addAllSector1ToLocalCache(allSector1: Sector1Energy[]): void {
        localStorage.setItem('allSector1', JSON.stringify(allSector1));
    }

    public getAllSector1FromLocalCache(): Sector1Energy[] {
        if (localStorage.getItem('allSector1')) {
            return JSON.parse(localStorage.getItem('allSector1'));
        }
        return null;
    }
    
    public createSectorFormDate(loggedInUsername: string, sector1Energy: Sector1Energy): FormData {
        
        function getValue(x: any): any{
            if (x== "" || x == null || x === null || typeof x === 'undefined') {
                return '';
            }
            return x;
        }

        const formData = new FormData();
        formData.append('city', getValue(sector1Energy.city));
        formData.append('inventoryPeriod', getValue(sector1Energy.inventoryPeriod));
        formData.append('userName', getValue(loggedInUsername));
        formData.append('subSector', getValue(sector1Energy.subSector));
        formData.append('scope', getValue(sector1Energy.scope));
        formData.append('diesel', JSON.stringify(getValue(sector1Energy.diesel)));
        formData.append('dieselUnit', getValue(sector1Energy.dieselUnit));
        formData.append('gasoline', JSON.stringify(getValue(sector1Energy.gasoline)));
        formData.append('gasolineUnit', getValue(sector1Energy.gasolineUnit));
        formData.append('naturalGas', JSON.stringify(getValue(sector1Energy.naturalGas)));
        formData.append('naturalGasUnit', getValue(sector1Energy.naturalGasUnit));
        formData.append('lgn', JSON.stringify(getValue(sector1Energy.lgn)));
        formData.append('lgnUnit', getValue(sector1Energy.lgnUnit));
        formData.append('propane', JSON.stringify(getValue(sector1Energy.propane)));
        formData.append('propaneUnit', getValue(sector1Energy.propaneUnit));
        formData.append('other', JSON.stringify(getValue(sector1Energy.other)));        
        formData.append('otherUnit', getValue(sector1Energy.otherUnit));
        formData.append('otherDescription', getValue(sector1Energy.otherDescription));        
        formData.append('electricity', JSON.stringify(getValue(sector1Energy.electricity)));
        formData.append('electricityUnit', getValue(sector1Energy.electricityUnit));        
        return formData;
    }

}