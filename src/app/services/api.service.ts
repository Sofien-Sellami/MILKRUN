import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postTruck(data : any){
    return this.http.post<any>("http://localhost:3000/truckList/",data);
  }
  getTruck(){
    return this.http.get<any>("http://localhost:3000/truckList/");
  }
  putTruck(data:any, id : number){
    return this.http.put<any>("http://localhost:3000/truckList/"+id, data);

  }
  deleteTruck(id:number){
    return this.http.delete<any>("http://localhost:3000/truckList/"+id);
  }
}
