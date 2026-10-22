import { AbstractControl, ValidationErrors } from "@angular/forms";

export class empIdValidators{

    static EmpIdValid(controls: AbstractControl): ValidationErrors| null{
              let val = controls.value ;

              let regEx  = /^[A-Z]\d{3}$/ ;

              let isValid = regEx.test(val);

              if(isValid){
                     return null;
              } else{
                  return {
                      isValidEmpId:"in valid employee id...!(E123)"
                  }
              }

    }
}
