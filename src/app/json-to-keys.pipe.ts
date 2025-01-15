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

    transform(jsonObject: any) : string[] {

        if (jsonObject == undefined)
            return [''];

        let keys: string[] = Object.keys(jsonObject);
        let values: any[] = Object.values(jsonObject);

        for (let i = 0; i < values.length; i++)
        {
            if (typeof(values[i]) === 'object')
            {
                let valAssociatedWithValueKey = values[i]['value'];
                values[i] = keys[i] + ' ' + valAssociatedWithValueKey;
            }
        }

        return values;
    }
}