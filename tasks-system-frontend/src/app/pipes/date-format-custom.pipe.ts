import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dateFormatCustom', pure: true })
export class DateFormatCustomPipe implements PipeTransform {

    convert(dateAsString: string): string {
        let dataToken = dateAsString.split('T')
        dataToken = dataToken[0].split('-')
        return `${dataToken[2]}/${dataToken[1]}/${dataToken[0]}`
    }

    transform(dateAsString: string): string {
        const dateToken = dateAsString.split('/')
        return `${dateToken[2]}-${dateToken[1]}-${dateToken[0]}T00:00:00`
    }
    
}