import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'decimalformat', pure: true })
export class DecimalFormatterCustomPipe implements PipeTransform {

    transform(value: number | string): string {        
        value = '' + value
        
        if (!value.includes('.')) {
            value = value + '.00'            
        }

        let intValue = value.substring(0, value.length -2)
        let decimalValue = value.substring(value.length - 2)
        intValue = intValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

        if (intValue.endsWith('.')) {
            intValue = intValue.substring(0, intValue.length -1)
        }

        if (decimalValue.startsWith('.')) {
            decimalValue = decimalValue.substring(1, decimalValue.length)
        }

        if (decimalValue.length == 1) {
            decimalValue = decimalValue + '0'
        }
        
        return `${intValue},${decimalValue}`.replace(',.', ',')
    }

    convert(value: string): number {
        value = value.split(' ')[1]
        value = value.replace(/\./g, '')
        value = value.replace(',', '.')
        
        return parseFloat(value)
    }
}