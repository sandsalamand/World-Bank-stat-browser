import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface WorldBankResponse {
    countriesData: CountryData[];
}

export interface CountryData 
{
    responseMetaData: ResponseMetaData;
    mainData: MainData[];
}

export interface ResponseMetaData
{
    page: number;
    pages: number;
    per_page: string;
    total: number
}

export interface MainData
{
    id: string;
    iso2Code: string;
    name: string;
    region: {
        id: string;
        iso2code: string;
        value: string;
    },
    adminregion: {
        id: string;
        iso2code: string;
        value: string;
    },
    incomeLevel: {
        id: string;
        iso2code: string;
        value: string;
    },
    lendingType: {
        id: string;
        iso2code: string;
        value: string;
    },
    capitalCity: string;
    longitude: string;
    latitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

    //data-display.component subscribes to this to get new data when getCountryData is called from svg.component
    public apiRequestResult: Subject<MainData> = new Subject<MainData>();

    constructor(private http: HttpClient) {}
    
    public getCountryData(countryId: string) : Subject<MainData>
    {
        let requestUrl = "https://api.worldbank.org/v2/country/" + countryId + '?format=json';
        this.http.get<any>(requestUrl).subscribe(response => {
            //The JSON served by the API is missing some key names, so we have to parse the empty keys with [1][0] to get to the named keys
            let mainJsonObject = response[1][0];
            this.apiRequestResult.next(<MainData>mainJsonObject);
        });

        return this.apiRequestResult;
    }
}
