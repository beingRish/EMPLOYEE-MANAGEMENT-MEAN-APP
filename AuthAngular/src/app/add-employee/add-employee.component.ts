import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
    
  addEmployeeForm!: FormGroup
  data: {} = {}

  constructor(
    private _du: DesignUtilityService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      dept: ['', Validators.required],
      status: ['', Validators.required]
  })
  }

  

  onBack() {
    this.router.navigate(['/dashboard'])
  }


  onSubmit(): void {
    if (this.addEmployeeForm.valid) {
      this._du.addEmployee(this.addEmployeeForm.value).subscribe(
        (res: any) => {
          this.onBack()
          console.log('Employee added successfully', res);
        },
      );
    } else {
      console.error('Form is invalid');
    }
  }

}

