import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "src/app/appInterface/emp.interface";
import { GetEmployee } from "../actions/employee.action";
import { DesignUtilityService } from "src/app/appServices/design-utility.service";
import { tap } from "rxjs";

// State Model

export class EmployeeStateModel {
    employees!: Employee[];
}

// State

@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees : []
    }
})

@Injectable()
export class EmployeeState{
    constructor(private _du: DesignUtilityService){}

    // Selectors has logic to get state data

    // Get Employee list from state
    @Selector()
    static getEmployeeList(state: EmployeeStateModel){
        return state.employees
    }

    @Action(GetEmployee)
    getEmployees({getState, setState}: StateContext<EmployeeStateModel>){
        return this._du.getEmployeeList().pipe(
            tap((res)=>{
                const state = getState();
                setState({
                    ...state,
                    employees: res
                })
            })
        )
    }
}