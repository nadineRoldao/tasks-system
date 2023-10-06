import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'decimalformat', pure: true })
export class DecimalFormatterCustomPipe implements PipeTransform {

    transform(value: number | string): string {
        value = '' + value
        let intValue = value.substring(0, value.length -2)
        const decimalValue = value.substring(value.length - 2)
        intValue = intValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

        let currentValue = `${intValue},${decimalValue}`

        return currentValue.replace('.,', ',')
    }

    convert(value: string): number {
        value = value.split(' ')[1]
        value = value.replace(/\./g, '')
        value = value.replace(',', '.')
        
        return parseFloat(value)
    }
}