import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

const MAX_VALUE = 9999999
const MAX_LENGTH = 9
const PREFIX = 'R$'
let lastValue = '0'

function _isHigherThanMaxValue(value: string) {
    if (!MAX_VALUE) return false
    
    while (value.length < 3) {
        value = "0" + value
    }

    let int = value.substring(0, value.length -2)
    const decimal = value.substring(value.length - 2)
    const valueParsed = parseFloat(`${int}.${decimal}`)
    
    return valueParsed > MAX_VALUE
}

@Directive({
    selector: '[decimal-mask]'
})
export class DecimalMaskDirective { 

    @Output()
    decimalValueEmitter = new EventEmitter<string>()

    @HostListener('keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement
        let value = input.value.replace(/\D/g, '')

        while (value.charAt(0) === '0') {
            value = value.substring(1)
        }

        // check max value
        if (_isHigherThanMaxValue(value)) {
            input.value = `${PREFIX} ${lastValue}`
            this.decimalValueEmitter.emit(input.value)
            return
        }

        // limitting max value
        if (value.length > MAX_LENGTH) {
            value = value.substring(0, MAX_LENGTH)
        }
       
        // fulfill decimal number
        while (value.length < 3) {
            value = "0" + value
        }

        // formatting decimal number 
        let intValue = value.substring(0, value.length -2)
        const decimalValue = value.substring(value.length - 2)
        intValue = intValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        const currentValue = `${intValue},${decimalValue}`

        lastValue = currentValue
        input.value = `${PREFIX} ${currentValue}`

        this.decimalValueEmitter.emit(input.value)
    }
}