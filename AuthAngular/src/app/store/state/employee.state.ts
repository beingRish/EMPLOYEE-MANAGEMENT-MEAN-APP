import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "src/app/appInterface/emp.interface";
import { GetEmployee, SetSelectedEmployee } from "../actions/employee.action";
import { DesignUtilityService } from "src/app/appServices/design-utility.service";
import { tap } from "rxjs";

// State Model

export class EmployeeStateModel {
    employees!: Employee[];
    employeesLoaded!: boolean;
    selectedEmployee!: Employee | null
}

// State

@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees : [],
        employeesLoaded: false,
        selectedEmployee: null
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

    // Get loaded employee from state
    @Selector()
    static employeeLoaded(state: EmployeeStateModel){
        return state.employeesLoaded
    }

    // Get Selected Employee from state
    @Selector()
    static selectedEmployee(state: EmployeeStateModel){
        return state.selectedEmployee
    }

    @Action(GetEmployee)
    getEmployees({getState, setState}: StateContext<EmployeeStateModel>){
        return this._du.getEmployeeList().pipe(
            tap((res)=>{
                const state = getState();
                setState({
                    ...state,
                    employees: res,
                    employeesLoaded: true
                })
            })
        )
    }

    @Action(SetSelectedEmployee)
    setSelectedEmployee({getState, setState}: StateContext<EmployeeStateModel>, {id}: SetSelectedEmployee) {
        const state = getState();
        const empList = state.employees;
        const index = empList.findIndex(emp => emp._id === id)
        
        setState({
            ...state,
            selectedEmployee: empList[index]
        })
    }
}