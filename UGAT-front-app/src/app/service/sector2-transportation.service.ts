import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sector2Transportation } from '../model/sector2-transportation';
import { CustomHttpRespone } from '../model/custom-http-response';

@Injectable({providedIn: 'root'})
export class Sector2TransportationService {
    private host = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getAllSector2(): Observable<Sector2Transportation[]> {
        return this.http.get<Sector2Transportation[]>(`${this.host}/sector2Transportation/list`);
    }

    public getSector2ById(id: number): Observable<Sector2Transportation> {
        return this.http.get<Sector2Transportation>(`${this.host}/sector2Transportation/find/id/${id}`);
    }
    
    public getAllSector2BySubSector(subSector: string): Observable<Sector2Transportation[]> {
        return this.http.get<Sector2Transportation[]>(`${this.host}/sector2Transportation/find/subSector/${subSector}`);
    }

    public getAllSector2ByScope(scope: string): Observable<Sector2Transportation[]> {
        return this.http.get<Sector2Transportation[]>(`${this.host}/sector2Transportation/find/scope/${scope}`);
    }

    public addSector2(formData: FormData): Observable<Sector2Transportation> {
        return this.http.post<Sector2Transportation>(`${this.host}/sector2Transportation/add`, formData);
    }

    public updateSector2(formData: FormData): Observable<Sector2Transportation> {
        return this.http.post<Sector2Transportation>(`${this.host}/sector2Transportation/update`, formData);
    }

    public deleteSector2(id: number): Observable<CustomHttpRespone> {
        return this.http.delete<CustomHttpRespone>(`${this.host}/sector2Transportation/delete/${id}`);
    }

    public addAllSector2ToLocalCache(allSector2: Sector2Transportation[]): void {
        localStorage.setItem('allSector2', JSON.stringify(allSector2));
    }

    public getAllSector2FromLocalCache(): Sector2Transportation[] {
        if (localStorage.getItem('allSector2')) {
            return JSON.parse(localStorage.getItem('allSector2'));
        }
        return null;
    }
    
    public createSectorFormDate(loggedInUsername: string, sector2Transportation: Sector2Transportation): FormData {
        
        function getValue(x: any): any{
            if (x== "" || x == null || x === null || typeof x === 'undefined') {
                return '';
            }
            return x;
        }

        const formData = new FormData();
        formData.append('city', getValue(sector2Transportation.city));
        formData.append('inventoryPeriod', getValue(sector2Transportation.inventoryPeriod));
        formData.append('userName', getValue(loggedInUsername));
        formData.append('subSector', getValue(sector2Transportation.subSector));
        formData.append('scope', getValue(sector2Transportation.scope));
        formData.append('diesel', JSON.stringify(getValue(sector2Transportation.diesel)));
        formData.append('dieselUnit', getValue(sector2Transportation.dieselUnit));
        formData.append('gasoline', JSON.stringify(getValue(sector2Transportation.gasoline)));
        formData.append('gasolineUnit', getValue(sector2Transportation.gasolineUnit));
        formData.append('naturalGas', JSON.stringify(getValue(sector2Transportation.naturalGas)));
        formData.append('naturalGasUnit', getValue(sector2Transportation.naturalGasUnit));
        formData.append('lgn', JSON.stringify(getValue(sector2Transportation.lgn)));
        formData.append('lgnUnit', getValue(sector2Transportation.lgnUnit));
        formData.append('propane', JSON.stringify(getValue(sector2Transportation.propane)));
        formData.append('propaneUnit', getValue(sector2Transportation.propaneUnit));
        formData.append('other', JSON.stringify(getValue(sector2Transportation.other)));        
        formData.append('otherUnit', getValue(sector2Transportation.otherUnit));
        formData.append('otherDescription', getValue(sector2Transportation.otherDescription));        
        formData.append('electricity', JSON.stringify(getValue(sector2Transportation.electricity)));
        formData.append('electricityUnit', getValue(sector2Transportation.electricityUnit));        
        return formData;
    }

}