import { Component } from '@angular/core';
import { HousingService } from '../../housing.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading = false
  loginData = {email:"", password:""}
  message = ""
  constructor(private housingService: HousingService, private route:Router) {
    // this.filteredLocationList.set(this.housingService.getAllHousingLocations());
  }
  
  handleSubmit(e:any){
    this.loading = true
    e.preventDefault();
    this.housingService.loginAdmin(this.loginData).subscribe({
      next:(res:any)=>{
        localStorage.setItem("t", res.token)
        this.message = res.message
        this.loginData = {email:"", password:""};
        this.loading = false
        this.route.navigate(['/'])
      }, 
      error:(err:any)=>{
        console.log(err);
        this.message = err.error.message
        this.loading = false
      }
    })
  }
}
