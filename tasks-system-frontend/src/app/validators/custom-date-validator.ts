import { constants } from 'src/app/utils/app-util'
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const result = !control.value?.match(constants.dateValidatorRegex)
        return { isCustomDateInvalid: result }
    }
}
