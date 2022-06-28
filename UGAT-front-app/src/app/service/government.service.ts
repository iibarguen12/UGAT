import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Government } from '../model/government';
import { CustomHttpRespone } from '../model/custom-http-response';

@Injectable({providedIn: 'root'})
export class GovernmentService {
    private host = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getGovernment(cityName: string, inventoryPeriod: string): Observable<Government> {
        return this.http.get<Government>(`${this.host}/government/find/${cityName}/${inventoryPeriod}`);
    }
    
    public getGovernments(): Observable<Government[]> {
        return this.http.get<Government[]>(`${this.host}/government/list`);
    }

    public addGovernment(formData: FormData): Observable<Government> {
        return this.http.post<Government>(`${this.host}/government/add`, formData);
    }

    public updateGovernment(formData: FormData): Observable<Government> {
        return this.http.post<Government>(`${this.host}/government/update`, formData);
    }

    public deleteGovernment(cityName: string, inventoryPeriod: string): Observable<CustomHttpRespone> {
        return this.http.delete<CustomHttpRespone>(`${this.host}/government/delete/${cityName}/${inventoryPeriod}`);
    }

    public addGovernmentsToLocalCache(governments: Government[]): void {
        localStorage.setItem('governments', JSON.stringify(governments));
    }

    public getGovernmentsFromLocalCache(): Government[] {
        if (localStorage.getItem('governments')) {
            return JSON.parse(localStorage.getItem('governments'));
        }
        return null;
    }
    
    public createGovernmentFormDate(loggedInUsername: string, government: Government): FormData {
        const formData = new FormData();
        formData.append('currentUsername', loggedInUsername);
        formData.append('submissionDate', JSON.stringify(government.submissionDate));
        formData.append('inventoryPeriod', government.inventoryPeriod);
        formData.append('cityName', government.cityName);
        formData.append('population', JSON.stringify(government.population));
        formData.append('populationYear', JSON.stringify(government.populationYear));
        formData.append('gDPInUSD', JSON.stringify(government.gDPInUSD));
        formData.append('landArea', JSON.stringify(government.landArea));
        formData.append('inventoryLevel', government.inventoryLevel);
        formData.append('personInCharge', government.personInCharge);
        formData.append('contactEmail', government.contactEmail);
        formData.append('gHGInventoryVerified', government.gHGInventoryVerified);
        formData.append('verificationYear', JSON.stringify(government.verificationYear));
        formData.append('verificationContact', government.verificationContact);
        return formData;
    }

}