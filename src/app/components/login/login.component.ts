import { Component } from '@angular/core';
import { HousingService } from '../../housing.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { KeyboardComponent } from '../keyboard/keyboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, KeyboardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  popUp:boolean=false;
  loading = false
  loginData = {email:"", password:""}
  message = {type:false, status:""}
  constructor(private housingService: HousingService, private route:Router) {
    // this.filteredLocationList.set(this.housingService.getAllHousingLocations());
  }
  
  handleSubmit(e:any){
    this.loading = true
    e.preventDefault();
    this.housingService.loginAdmin(this.loginData).subscribe({
      next:(res:any)=>{
        localStorage.setItem("t", res.token)
        this.message.status = res.message
        this.message.type = true
        this.loginData = {email:"", password:""};
        this.loading = false
        this.route.navigate(['/'])
      }, 
      error:(err:any)=>{
        console.log(err);
        this.message.status = err.error.message
        this.message.type =false
        this.loading = false
      }
    })
  }
}
