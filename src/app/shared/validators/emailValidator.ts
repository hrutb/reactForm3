import { AbstractControl, ValidationErrors } from "@angular/forms";

export class emailValidation{

  static emailvalidator(control:AbstractControl): Promise<ValidationErrors| null>{


    return new Promise((resolve,reject)=>{
      let val:string  = control.value;

        setTimeout(()=>{
                if(val==='jhon@gmail.com'){
                      resolve({
                            invalidEmail:'Email already in use'
                      })
                  }else{
                       resolve(null)
                  }
              },900)
       } )
  }
}
