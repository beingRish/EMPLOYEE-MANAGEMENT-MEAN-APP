import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit{

  user: any;
  userId: any;

  constructor(
    private _du: DesignUtilityService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')
    this._du.fetchSingleEmployee(this.userId).subscribe(res => {
      this.user = res
    })
  }
}
