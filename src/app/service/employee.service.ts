import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
addEmpUrl : string;
getAllEmpUrl : string;
updateEmpUrl : string;
deleteEmpUrl : string;
  constructor(private http : HttpClient) { 
    this.addEmpUrl = 'http://localhost:8282/emp';
    this.getAllEmpUrl = 'http://localhost:8282/emp/getAllEmp';
    this.updateEmpUrl =  'http://localhost:8282/emp/updateEmployee';
    this.deleteEmpUrl =  'http://localhost:8282/emp/deleteEmployeeById';
  }

  addEmployee(emp : Employee): Observable<Employee>{
    return this.http.post<Employee>(this.addEmpUrl,emp);
  }

  getAllEmployee(): Observable<Employee[]>{
     return this.http.get<Employee[]>(this.getAllEmpUrl);
  }

  updateEmployee(emp : Employee): Observable<Employee>{
    return this.http.put<Employee>(this.updateEmpUrl+'/'+emp.id,emp);
 }

 deleteteEmployee(emp : Employee): Observable<Employee>{
  return this.http.delete<Employee>(this.deleteEmpUrl+'/'+emp.id);
}
}
