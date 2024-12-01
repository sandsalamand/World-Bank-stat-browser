import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface WorldBankResponse {
    countriesData: CountryData[];
}

export interface CountryData 
{
    responseMetaData: ResponseMetaData;
    mainData: SimpleData[];
}

export interface ResponseMetaData
{
    page: number;
    pages: number;
    per_page: string;
    total: number
}

export interface SimpleData
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

export class AdvancedData
{
    population: string = 'N/a';
    gdp: string = 'N/a';
}

// export interface DisplayedData
// {
//     id: string;
//     iso2Code: string;
//     name: string;
//     region: {
//         value: string;
//     },
//     incomeLevel: {
//         value: string;
//     },
//     lendingType: {
//         value: string;
//     },
//     capitalCity: string;
//     longitude: string;
//     latitude: string;
// }

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

    //data-display.component subscribes to this to get new data when getCountryData is called from svg.component
    public apiRequestResult: Subject<SimpleData> = new Subject<SimpleData>();

    constructor(private http: HttpClient) {}
    
    public getCountryData()
    {

    }

    /**
     * Get basic data about a country
     * @returns {Subject<SimpleData>} - An observable which receives updates when country data is retrieved from the server
     * @param {string} iso2Code - This needs to be the 2 letter country id
     */
    public getSimpleCountryData(iso2Code: string) : Subject<SimpleData>
    {
        let requestUrl = "https://api.worldbank.org/v2/country/" + iso2Code + '?format=json';
        this.http.get<any>(requestUrl).subscribe(response => {
            //The JSON served by the API is missing some key names, so we have to parse the empty keys with [1][0] to get to the named keys
            let mainJsonObject = response[1][0];
            this.apiRequestResult.next(<SimpleData>mainJsonObject);
        });

        return this.apiRequestResult;
    }

    /**
     * Get advanced data about a country. Includes population and GDP
     * @returns {Subject<SimpleData>} - An observable which receives updates when advanced data is retrieved
     * @param {string} countryId - This needs to be the 3 letter country id
     */
    public getAdvancedCountryData(countryId: string) : Subject<AdvancedData> 
    {
        let returnData = new AdvancedData();

        //We don't know which response will return first, so push to the observable when receivedResponses is 2
        let receivedResponses = 0;

        let returnObservable = new Subject<AdvancedData>();

        let populationRequestUrl = "https://api.worldbank.org/v2/sources/57/country/" + countryId + "/series/SP.POP.TOTL/version/202004/data?format=jsonstat";

        //When we get the HTTP response, push that to the observable which is returned by this function
        this.http.get<any>(populationRequestUrl).subscribe(response => {
            let populationDataPoints: number[] = response.WDA.value;

            //Find the most recent data point. Since the data is sorted by ascending year, we start searching from the end of the array.
            let mostRecentDataPoint: string = 'N/a';
            for (let i = populationDataPoints.length - 1; i >= 0; i--)
            {
                if (populationDataPoints[i])
                {
                    mostRecentDataPoint = populationDataPoints[i].toString();
                    console.log(" i was " + i);
                    break;
                }
            }
            returnData.population = mostRecentDataPoint;
            receivedResponses++;
            if (receivedResponses == 2)
                returnObservable.next(returnData);
        });

        let gdpRequestUrl = 'https://api.worldbank.org/v2/sources/57/country/' + countryId +'/series/NY.GDP.MKTP.KD/time/yr2018/version/202204/data?format=jsonstat';
        this.http.get<any>(gdpRequestUrl).subscribe(response => {
            //for this request, we specifically request 2018, so we don't need to find the most recent data
            returnData.gdp = response.WDA.value[0];
            receivedResponses++;
            if (receivedResponses == 2)
                returnObservable.next(returnData);
        });

        return returnObservable;
    }
}
