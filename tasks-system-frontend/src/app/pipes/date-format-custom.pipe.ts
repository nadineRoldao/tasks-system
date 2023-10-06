import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dateFormatCustom', pure: true })
export class DateFormatCustomPipe implements PipeTransform {

    transform(dateAsString: string): string {
        const dateToken = dateAsString.split('/')
        return `${dateToken[2]}-${dateToken[1]}-${dateToken[0]}T00:00:00`
    }
}