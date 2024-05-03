import { Inject, Injectable, afterNextRender, signal } from '@angular/core';
import { HouseingLocation } from './houseing-location';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { File } from 'buffer';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  constructor(private http:HttpClient, @Inject(DOCUMENT) private documentMy:Document) {
    afterNextRender(()=>
      this.likedPlace = localStorage.getItem('like-place')
    ) 
  }
  housingLocationList: HouseingLocation[] = [];
  likedPlace:any = signal('');


  updateDataDetails = {
    data:signal({
      name:"",
      photo:'',
      city:"",
      state:"",
      wifi:false,
      description: ""
    }),
    edit:false,
    id:""
  }
 
  public addLikedPlace(id:string){
    const idx = this.likedPlace().findIndex((item:any)=>item?._id ==id)
    const index = this.housingLocationList.findIndex((item)=>item._id==id);  
    if(idx==-1){
      this.likedPlace().push(this.housingLocationList[index]);
      localStorage.setItem("like-place", `${this.likedPlace()}`)
    }
    else {
      this.likedPlace().splice(idx, 1);
    }
 }
  getLikedPlace(){
    return this.likedPlace();
  }
 getAllHousingLocations(): Observable<HouseingLocation[]> {
const data = this.http.get<HouseingLocation[]>(`${environment.apiUrl}/housing`)
  data.subscribe(res=>this.housingLocationList = res);
  return data;
}

 createHousing(data:any){
  console.log(data);
  const formData = new FormData();
  formData.append("name", data.name)
  formData.append("city", data.city)
  formData.append("state", data.state)
  formData.append("description", data.description)
  formData.append("wifi", data.wifi)
  formData.append('photo', data.photo)
  const token =localStorage.getItem("t"); 
  return this.http.post(`${environment.apiUrl}/housing`, formData, {headers:{
    'token':`${token}`
  }})
 }

 uploadImage(data:any){
  console.log(data);
  
  return this.http.post(`${environment.apiUrl}/housing/upload`, data)
 }

getHousingLocationById(id: string): Observable<HouseingLocation>| undefined {
  return this.http.get<HouseingLocation>(`${environment.apiUrl}/housing/${id}`);
}

getClientResponse(){
  return this.http.get(`${environment.apiUrl}/student`);
}

deleteHousingLocation(id:any){
  const token =localStorage.getItem("t");
  return this.http.delete(`${environment.apiUrl}/housing/${id}`, {headers:{'token':`${token}`}})
}

updateHousingLocation(id:any, data:any){
  return this.http.put(`${environment.apiUrl}/housing/${id}`, data);
}

loginAdmin(data:any){
  return this.http.post(`${environment.apiUrl}/login`, data);
}

checkStatus(){
  const localStorage = this.documentMy.defaultView?.localStorage;
  const token = localStorage?.getItem("t");
  if(token){
    return true
  }
  else return false
}

submitApplication(firstName: string, lastName: string, email: string) {
  const body = {firstName:firstName, lastName:lastName, email:email}
  return this.http.post(`${environment.apiUrl}/student`, body)
}
}
