import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { empIdValidators } from '../../validators/empId';
import { emailValidation } from '../../validators/emailValidator';
import { Iciti } from '../../model/citizenship.model';
import { CITIZENSHIPS } from '../../const/citizenship';
// import { EmpIdValidator, empIdValidators } from '../../validators/empId';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      this.createForm();
      this.valueChanges();
      this.patchValues();
      this.onAddSkill();
      this.onAddDependen();
  }

   loginForm!:FormGroup;

   citizenship:Iciti[] = CITIZENSHIPS

       createForm(){
            this.loginForm = new FormGroup({

                username: new FormControl(null,[Validators.required]),
                email:    new FormControl(null, [Validators.required],[emailValidation.emailvalidator]),
                empId:    new FormControl(null,[Validators.required,empIdValidators.EmpIdValid]),
                password: new FormControl(null,[Validators.required]),
                confirmPassword : new FormControl(null,[Validators.required]),


                address : new FormGroup({
                    current:  new FormGroup({
                           city: new FormControl(null,[Validators.required]),
                          state: new  FormControl(null,[Validators.required]),
                        country: new FormControl(null,[Validators.required]),
                        pincode: new FormControl(null,[Validators.required])
                    }),

                     permanent : new FormGroup({
                           city: new FormControl(null, [Validators.required]),
                          state: new  FormControl(null, [Validators.required]),
                        country: new FormControl(null, [Validators.required]),
                        pincode: new FormControl(null, [Validators.required])
                     }),
                    }),
                       isAddSame: new FormControl({value:false,disabled:true}),
                          Skills: new FormArray([]) ,
                     dependents : new FormArray([])

            })
       }


       get controls(){
            return this.loginForm.controls;
       }

       get current(){
           return this.loginForm.get('current') as FormGroup ;
       }

       onLogged(){
         if(this.loginForm.invalid){
           this.loginForm.markAllAsTouched()

         }else{

           console.log(this.loginForm.value);
         }
       }


    valueChanges(){
          this.loginForm.get('address.current')?.valueChanges
               .subscribe(res=>{
                 console.log(res);

                 if(this.loginForm.get('address.current')?.valid){
                      // this.loginForm.get('isAddSame')?.enable();
                     this.controls['isAddSame']?.enable() ;

                 }else{
                     this.controls['isAddSame']?.disable() ;
                     this.controls['isAddSame']?.reset() ;
                 }

               })


      }

      patchValues(){
         this.loginForm.get('isAddSame')?.valueChanges
                  .subscribe(isValid=>{
                      if(isValid){
                        let currentAdd= this.loginForm.get('address.current')?.value;
                        this.loginForm.get('address.permanent')?.patchValue(currentAdd);
                        this.loginForm.get('address.permanent')?.disable();
                      }else{
                        this.loginForm.get('address.permanent')?.reset();
                        this.loginForm.get('address.permanent')?.enable();


                      }
                  })
             }


     get SkillArr(){
          return this.loginForm.get('Skills') as FormArray;
     }

     onAddSkill(){
          let controls= new FormControl(null,[Validators.required]);
         this.SkillArr.push(controls);
     }

 onRemove(i:number) {
       this.SkillArr.removeAt(i);
 }


 get dependentArr(){
      return this.loginForm.get('dependents') as FormArray;
 }

 onAddDependen(){
      //  let controls = new FormGroup({})
      //   this.dependentArr.push(controls)

        if(this.loginForm.valid){
            let dependentGrp = new FormGroup({
                     fullname : new FormControl(null, [Validators.required]),
                  citizenship : new FormControl(null, [Validators.required]),
                 relationship : new FormControl(null, [Validators.required]),

            })
            this.dependentArr.push(dependentGrp);
        }
  }



}
