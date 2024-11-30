import { Pipe, PipeTransform } from '@angular/core';

export class KeyValuePair
{
    key: string;
    value: any;

    constructor(key:string, value: any)
    {
        this.key = key;
        this.value = value;
    }
}

@Pipe({
  name: 'jsonToKeys',
  standalone: true
})
export class JsonToKeysPipe implements PipeTransform {

    transform(jsonObject: any) : KeyValuePair[] {
        let keyValuePairs: KeyValuePair[] = [];
        for (let key in jsonObject) {
            keyValuePairs.push(new KeyValuePair(key, jsonObject[key]));
        }
        return keyValuePairs;
      }

}