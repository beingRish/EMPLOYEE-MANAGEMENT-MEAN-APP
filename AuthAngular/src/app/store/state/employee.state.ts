import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import { Employee } from "src/app/appInterface/emp.interface";

// State Model

export class EmployeeStateModel {
    employees!: Employee[];
}

// State

@Injectable()
@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees : []
    }
})

export class EmployeeState{

}