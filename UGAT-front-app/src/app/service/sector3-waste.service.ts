import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sector3Waste } from '../model/sector3-waste';
import { CustomHttpRespone } from '../model/custom-http-response';

@Injectable({providedIn: 'root'})
export class Sector3WasteService {
    private host = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getAllSector3(): Observable<Sector3Waste[]> {
        return this.http.get<Sector3Waste[]>(`${this.host}/sector3Waste/list`);
    }

    public getSector3ById(id: number): Observable<Sector3Waste> {
        return this.http.get<Sector3Waste>(`${this.host}/sector3Waste/find/id/${id}`);
    }
    
    public getAllSector3BySubSector(subSector: string): Observable<Sector3Waste[]> {
        return this.http.get<Sector3Waste[]>(`${this.host}/sector3Waste/find/subSector/${subSector}`);
    }

    public getAllSector3ByScope(scope: string): Observable<Sector3Waste[]> {
        return this.http.get<Sector3Waste[]>(`${this.host}/sector3Waste/find/scope/${scope}`);
    }

    public addSector3(formData: FormData): Observable<Sector3Waste> {
        return this.http.post<Sector3Waste>(`${this.host}/sector3Waste/add`, formData);
    }

    public updateSector3(formData: FormData): Observable<Sector3Waste> {
        return this.http.post<Sector3Waste>(`${this.host}/sector3Waste/update`, formData);
    }

    public deleteSector3(id: number): Observable<CustomHttpRespone> {
        return this.http.delete<CustomHttpRespone>(`${this.host}/sector3Waste/delete/${id}`);
    }

    public addAllSector3ToLocalCache(allSector3: Sector3Waste[]): void {
        localStorage.setItem('allSector3', JSON.stringify(allSector3));
    }

    public getAllSector3FromLocalCache(): Sector3Waste[] {
        if (localStorage.getItem('allSector3')) {
            return JSON.parse(localStorage.getItem('allSector3'));
        }
        return null;
    }
    
    public createSectorFormDate(loggedInUsername: string, sector3Waste: Sector3Waste): FormData {
        
        function getValue(x: any): any{
            if (x== "" || x == null || x === null || typeof x === 'undefined') {
                return '';
            }
            return x;
        }

        const formData = new FormData();
        formData.append('city', getValue(sector3Waste.city));
        formData.append('inventoryPeriod', getValue(sector3Waste.inventoryPeriod));
        formData.append('userName', getValue(loggedInUsername));
        formData.append('subSector', getValue(sector3Waste.subSector));
        formData.append('scope', getValue(sector3Waste.scope));
        formData.append('organic', JSON.stringify(getValue(sector3Waste.organic)));
        formData.append('organicUnit', getValue(sector3Waste.organicUnit));
        formData.append('paper', JSON.stringify(getValue(sector3Waste.paper)));
        formData.append('paperUnit', getValue(sector3Waste.paperUnit));
        formData.append('plastic', JSON.stringify(getValue(sector3Waste.plastic)));
        formData.append('plasticUnit', getValue(sector3Waste.plasticUnit));
        formData.append('glass', JSON.stringify(getValue(sector3Waste.glass)));
        formData.append('glassUnit', getValue(sector3Waste.glassUnit));
        formData.append('gardening', JSON.stringify(getValue(sector3Waste.gardening)));
        formData.append('gardeningUnit', getValue(sector3Waste.gardeningUnit));
        formData.append('inert', JSON.stringify(getValue(sector3Waste.inert)));        
        formData.append('inertUnit', getValue(sector3Waste.inertUnit));                
        formData.append('water', JSON.stringify(getValue(sector3Waste.water)));
        formData.append('waterUnit', getValue(sector3Waste.waterUnit));        
        return formData;
    }

}