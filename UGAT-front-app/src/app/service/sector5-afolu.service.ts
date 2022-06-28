import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sector5AFOLU } from '../model/sector5-afolu';
import { CustomHttpRespone } from '../model/custom-http-response';

@Injectable({providedIn: 'root'})
export class Sector5AFOLUService {
    private host = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getAllSector5(): Observable<Sector5AFOLU[]> {
        return this.http.get<Sector5AFOLU[]>(`${this.host}/sector5AFOLU/list`);
    }

    public getSector5ById(id: number): Observable<Sector5AFOLU> {
        return this.http.get<Sector5AFOLU>(`${this.host}/sector5AFOLU/find/id/${id}`);
    }
    
    public getAllSector5BySubSector(subSector: string): Observable<Sector5AFOLU[]> {
        return this.http.get<Sector5AFOLU[]>(`${this.host}/sector5AFOLU/find/subSector/${subSector}`);
    }

    public getAllSector5ByScope(scope: string): Observable<Sector5AFOLU[]> {
        return this.http.get<Sector5AFOLU[]>(`${this.host}/sector5AFOLU/find/scope/${scope}`);
    }

    public addSector5(formData: FormData): Observable<Sector5AFOLU> {
        return this.http.post<Sector5AFOLU>(`${this.host}/sector5AFOLU/add`, formData);
    }

    public updateSector5(formData: FormData): Observable<Sector5AFOLU> {
        return this.http.post<Sector5AFOLU>(`${this.host}/sector5AFOLU/update`, formData);
    }

    public deleteSector5(id: number): Observable<CustomHttpRespone> {
        return this.http.delete<CustomHttpRespone>(`${this.host}/sector5AFOLU/delete/${id}`);
    }

    public addAllSector5ToLocalCache(allSector5: Sector5AFOLU[]): void {
        localStorage.setItem('allSector5', JSON.stringify(allSector5));
    }

    public getAllSector5FromLocalCache(): Sector5AFOLU[] {
        if (localStorage.getItem('allSector5')) {
            return JSON.parse(localStorage.getItem('allSector5'));
        }
        return null;
    }
    
    public createSectorFormDate(loggedInUsername: string, sector5AFOLU: Sector5AFOLU): FormData {
        
        function getValue(x: any): any{
            if (x== "" || x == null || x === null || typeof x === 'undefined') {
                return '';
            }
            return x;
        }

        const formData = new FormData();
        formData.append('city', getValue(sector5AFOLU.city));
        formData.append('inventoryPeriod', getValue(sector5AFOLU.inventoryPeriod));
        formData.append('userName', getValue(loggedInUsername));
        formData.append('subSector', getValue(sector5AFOLU.subSector));
        formData.append('scope', getValue(sector5AFOLU.scope));
        formData.append('cows', getValue(sector5AFOLU.cows));
        formData.append('buffaloes', getValue(sector5AFOLU.buffaloes));
        formData.append('sheep', getValue(sector5AFOLU.sheep));
        formData.append('camel', getValue(sector5AFOLU.camel));
        formData.append('horses', getValue(sector5AFOLU.horses));
        formData.append('swine', getValue(sector5AFOLU.swine));
        formData.append('poultry', getValue(sector5AFOLU.poultry));
        formData.append('mulesAndAssess', getValue(sector5AFOLU.mulesAndAssess));
        formData.append('other', getValue(sector5AFOLU.other));
        formData.append('otherDescription', getValue(sector5AFOLU.otherDescription));
        formData.append('landEmission1', getValue(sector5AFOLU.landEmission1));
        formData.append('landEmission1Type', getValue(sector5AFOLU.landEmission1Type));
        formData.append('landEmission1Unit', getValue(sector5AFOLU.landEmission1Unit));
        formData.append('landEmission2', getValue(sector5AFOLU.landEmission2));
        formData.append('landEmission2Type', getValue(sector5AFOLU.landEmission2Type));
        formData.append('landEmission2Unit', getValue(sector5AFOLU.landEmission2Unit));
        formData.append('landEmission3', getValue(sector5AFOLU.landEmission3));
        formData.append('landEmission3Type', getValue(sector5AFOLU.landEmission3Type));
        formData.append('landEmission3Unit', getValue(sector5AFOLU.landEmission3Unit));
        formData.append('burning', getValue(sector5AFOLU.burning));
        formData.append('burningUnit', getValue(sector5AFOLU.burningUnit));
        formData.append('burningForest', getValue(sector5AFOLU.burningForest));
        formData.append('burningForestUnit', getValue(sector5AFOLU.burningForestUnit));
        formData.append('burningGrass', getValue(sector5AFOLU.burningGrass));
        formData.append('burningGrassUnit', getValue(sector5AFOLU.burningGrassUnit));
        formData.append('burningCrop', getValue(sector5AFOLU.burningCrop));
        formData.append('burningCropUnit', getValue(sector5AFOLU.burningCropUnit));
        formData.append('burningOther', getValue(sector5AFOLU.burningOther));
        formData.append('burningOtherUnit', getValue(sector5AFOLU.burningOtherUnit));
        formData.append('liming', getValue(sector5AFOLU.liming));
        formData.append('limingUnit', getValue(sector5AFOLU.limingUnit));
        formData.append('urea', getValue(sector5AFOLU.urea));
        formData.append('ureaUnit', getValue(sector5AFOLU.ureaUnit));
        formData.append('rice', getValue(sector5AFOLU.rice));
        formData.append('riceUnit', getValue(sector5AFOLU.riceUnit));

        
        return formData;
    }

}