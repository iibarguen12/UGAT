import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sector4IPPU } from '../model/sector4-IPPU';
import { CustomHttpRespone } from '../model/custom-http-response';

@Injectable({providedIn: 'root'})
export class Sector4IPPUService {
    private host = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getAllSector4(): Observable<Sector4IPPU[]> {
        return this.http.get<Sector4IPPU[]>(`${this.host}/sector4IPPU/list`);
    }

    public getSector4ById(id: number): Observable<Sector4IPPU> {
        return this.http.get<Sector4IPPU>(`${this.host}/sector4IPPU/find/id/${id}`);
    }
    
    public getAllSector4BySubSector(subSector: string): Observable<Sector4IPPU[]> {
        return this.http.get<Sector4IPPU[]>(`${this.host}/sector4IPPU/find/subSector/${subSector}`);
    }

    public getAllSector4ByScope(scope: string): Observable<Sector4IPPU[]> {
        return this.http.get<Sector4IPPU[]>(`${this.host}/sector4IPPU/find/scope/${scope}`);
    }

    public addSector4(formData: FormData): Observable<Sector4IPPU> {
        return this.http.post<Sector4IPPU>(`${this.host}/sector4IPPU/add`, formData);
    }

    public updateSector4(formData: FormData): Observable<Sector4IPPU> {
        return this.http.post<Sector4IPPU>(`${this.host}/sector4IPPU/update`, formData);
    }

    public deleteSector4(id: number): Observable<CustomHttpRespone> {
        return this.http.delete<CustomHttpRespone>(`${this.host}/sector4IPPU/delete/${id}`);
    }

    public addAllSector4ToLocalCache(allSector4: Sector4IPPU[]): void {
        localStorage.setItem('allSector4', JSON.stringify(allSector4));
    }

    public getAllSector4FromLocalCache(): Sector4IPPU[] {
        if (localStorage.getItem('allSector4')) {
            return JSON.parse(localStorage.getItem('allSector4'));
        }
        return null;
    }
    
    public createSectorFormDate(loggedInUsername: string, sector4IPPU: Sector4IPPU): FormData {
        
        function getValue(x: any): any{
            if (x== "" || x == null || x === null || typeof x === 'undefined') {
                return '';
            }
            return x;
        }

        const formData = new FormData();
        formData.append('city', getValue(sector4IPPU.city));
        formData.append('inventoryPeriod', getValue(sector4IPPU.inventoryPeriod));
        formData.append('userName', getValue(loggedInUsername));
        formData.append('subSector', getValue(sector4IPPU.subSector));
        formData.append('scope', getValue(sector4IPPU.scope));
        formData.append('clinker', getValue(sector4IPPU.clinker));
        formData.append('clinkerUnit', getValue(sector4IPPU.clinkerUnit));
        formData.append('lime', getValue(sector4IPPU.lime));
        formData.append('limeUnit', getValue(sector4IPPU.limeUnit));
        formData.append('glass', getValue(sector4IPPU.glass));
        formData.append('glassUnit', getValue(sector4IPPU.glassUnit));
        formData.append('ammonia', getValue(sector4IPPU.ammonia));
        formData.append('ammoniaUnit', getValue(sector4IPPU.ammoniaUnit));
        formData.append('nitricAcid', getValue(sector4IPPU.nitricAcid));
        formData.append('nitricAcidUnit', getValue(sector4IPPU.nitricAcidUnit));
        formData.append('adipicAcid', getValue(sector4IPPU.adipicAcid));
        formData.append('adipicAcidUnit', getValue(sector4IPPU.adipicAcidUnit));
        formData.append('othersAcid', getValue(sector4IPPU.othersAcid));
        formData.append('othersAcidUnit', getValue(sector4IPPU.othersAcidUnit));
        formData.append('carbide', getValue(sector4IPPU.carbide));
        formData.append('carbideUnit', getValue(sector4IPPU.carbideUnit));
        formData.append('titanium', getValue(sector4IPPU.titanium));
        formData.append('titaniumUnit', getValue(sector4IPPU.titaniumUnit));
        formData.append('soda', getValue(sector4IPPU.soda));
        formData.append('sodaUnit', getValue(sector4IPPU.sodaUnit));
        formData.append('metallurgical', getValue(sector4IPPU.metallurgical));
        formData.append('metallurgicalUnit', getValue(sector4IPPU.metallurgicalUnit));
        formData.append('iron', getValue(sector4IPPU.iron));
        formData.append('ironUnit', getValue(sector4IPPU.ironUnit));
        formData.append('ferroalloy', getValue(sector4IPPU.ferroalloy));
        formData.append('ferroalloyUnit', getValue(sector4IPPU.ferroalloyUnit));
        formData.append('aluminum', getValue(sector4IPPU.aluminum));
        formData.append('aluminumUnit', getValue(sector4IPPU.aluminumUnit));
        formData.append('magnesium', getValue(sector4IPPU.magnesium));
        formData.append('magnesiumUnit', getValue(sector4IPPU.magnesiumUnit));
        formData.append('lead', getValue(sector4IPPU.leadProduction));
        formData.append('leadUnit', getValue(sector4IPPU.leadUnit));
        formData.append('zinc', getValue(sector4IPPU.zinc));
        formData.append('zincUnit', getValue(sector4IPPU.zincUnit));
        formData.append('other', getValue(sector4IPPU.other));
        formData.append('otherUnit', getValue(sector4IPPU.otherUnit));
        formData.append('otherDescription', getValue(sector4IPPU.otherDescription));
        formData.append('lubricants', getValue(sector4IPPU.lubricants));
        formData.append('lubricantsUnit', getValue(sector4IPPU.lubricantsUnit));
        formData.append('parafin', getValue(sector4IPPU.parafin));
        formData.append('parafinUnit', getValue(sector4IPPU.parafinUnit));
        formData.append('petroleum', getValue(sector4IPPU.petroleum));
        formData.append('petroleumUnit', getValue(sector4IPPU.petroleumUnit));
        formData.append('aromatics', getValue(sector4IPPU.aromatics));
        formData.append('aromaticsUnit', getValue(sector4IPPU.aromaticsUnit));
        formData.append('fluids', getValue(sector4IPPU.fluids));
        formData.append('fluidsUnit', getValue(sector4IPPU.fluidsUnit));
        formData.append('pfc', getValue(sector4IPPU.pfc));
        formData.append('pfcUnit', getValue(sector4IPPU.pfcUnit));
        formData.append('hfc', getValue(sector4IPPU.hfc));
        formData.append('hfcUnit', getValue(sector4IPPU.hfcUnit));
        formData.append('other2', getValue(sector4IPPU.other2));
        formData.append('other2Unit', getValue(sector4IPPU.other2Unit));
        formData.append('other2Description', getValue(sector4IPPU.other2Description));
        
        return formData;
    }

}