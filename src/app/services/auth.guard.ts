import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { HousingService } from "../housing.service";

@Injectable({
   providedIn: "root",
})
export class AuthGuard{
   constructor(private authService:HousingService, private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.authService.checkStatus()) {
         return true;
      } else {
         this.router.navigate(["/login"]);
         return false;
      }
   }
}