import { Component } from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import {NgToastService} from 'ng-angular-popup';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  empDetail !:FormGroup;
  empObj : Employee =new Employee();
empList : Employee[] = [];
errorMessage: any;

  constructor(private formBuilder : FormBuilder, private empService : EmployeeService, private toast  :NgToastService){}

  ngOnInit(): void {
    this.getAllEmployee();
    this.empDetail = this.formBuilder.group({
      id : [''],
      name : [''],
      email: [''],
      salary:['']
    });
  }

 
  addEmployee(){
    console.log(this.empDetail);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.salary = this.empDetail.value.salary;

    this.empService.addEmployee(this.empObj).subscribe(res=>{
      console.log(res);
      this.toast.success({detail:"Success Message",summary:"Employee details added successfully.",duration:3000})
      this.getAllEmployee();

    },err=>{
      this.errorMessage=err;
      console.log(err.Message);
    
      this.toast.error({detail:"Failed Message",summary:"Something went wrong.",duration:3000});
    
     
    });
  }

  getAllEmployee(){
    this.empService.getAllEmployee().subscribe(res=>{
      this.empList = res;
    },err=>{
      console.log("error while fetching data.");
      this.toast.error({detail:"Failed Message",summary:"Error while fetching data",duration:3000});
    });
  }

  editEmployee(emp : Employee){
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['name'].setValue(emp.name);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['salary'].setValue(emp.salary);

  }

  updateEmployee(){
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.salary = this.empDetail.value.salary;

    this.empService.updateEmployee(this.empObj).subscribe(res=>{
      this.toast.success({detail:"Success Message",summary:"Employee details updated successfully.",duration:3000})
      this.getAllEmployee();
    },err=>{
      this.toast.error({detail:"Failed Message",summary:"Something went wrong",duration:3000})
      this.getAllEmployee();
    });
  }

  deleteEmployee(emp : Employee){
    this.empService.deleteteEmployee(emp).subscribe(res=>{
      this.toast.success({detail:"Success Message",summary:"Employee details deleted successfully.",duration:3000})
      this.getAllEmployee();
    },err=>{
      this.toast.error({detail:"Failed Message",summary:"Something went wrong",duration:3000})
      this.getAllEmployee();
    })
  }
}
