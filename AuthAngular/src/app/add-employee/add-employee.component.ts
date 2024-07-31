import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddEmployee } from '../store/actions/employee.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
    
  addEmployeeForm!: FormGroup
  data: {} = {}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
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
      this.store.dispatch(new AddEmployee(this.addEmployeeForm.value));
      this.onBack()
    } else {
      console.error('Form is invalid');
    }
  }

}

