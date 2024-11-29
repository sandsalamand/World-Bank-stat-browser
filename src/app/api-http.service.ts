import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

    constructor(private http: HttpClient) {}

    public getCountryData(countryId: string)
    {
        let requestUrl = "https://api.worldbank.org/v2/country/" + countryId;
        return this.http.get(requestUrl, {params: {format: 'json'}});
    }
}
