import { Injectable, signal } from '@angular/core';
import { HouseingLocation } from './houseing-location';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  constructor() { }
  housingLocationList: HouseingLocation[] = [
    {
      id: "0",
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnit: 4,
      wifi: true,
    },
    {
      id: "1",
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      availableUnit: 0,
      wifi: false,
    },
    {
      id: "2",
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      availableUnit: 1,
      wifi: false,
    },
    {
      id: "3",
      name: 'Homesteady Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
      availableUnit: 1,
      wifi: true,
    },
    {
      id: "4",
      name: 'Happy Homes Group',
      city: 'Gary',
      state: 'IN',
      photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      availableUnit: 1,
      wifi: true,
    },
    {
      id: "5",
      name: 'Hopeful Apartment Group',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
      availableUnit: 2,
      wifi: true,
    },
    {
      id: "6",
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      availableUnit: 5,
      wifi: true,
    },
    {
      id: "7",
      name: 'Hopeful Housing Solutions',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      availableUnit: 2,
      wifi: true,
    },
    {
      id: "8",
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      availableUnit: 10,
      wifi: false,
    },
    {
      id: "9",
      name: 'Capital Safe Towns',
      city: 'Portland',
      state: 'OR',
      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      availableUnit: 6,
      wifi: true,
    }
  ];
  likedPlace = signal<HouseingLocation[]>([
    {
      id: "7",
      name: 'Hopeful Housing Solutions',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      availableUnit: 2,
      wifi: true,
    },
    {
      id: "8",
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      availableUnit: 10,
      wifi: false,
    },
    {
      id: "9",
      name: 'Capital Safe Towns',
      city: 'Portland',
      state: 'OR',
      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      availableUnit: 6,
      wifi: true,
    }
  ]);

 
  public addLikedPlace(id:string){
    const idx = this.likedPlace().findIndex((item)=>item?.id ==id)
    const index = this.housingLocationList.findIndex((item)=>item.id==id);  
    if(idx==-1){
      this.likedPlace().push(this.housingLocationList[index]);
    }
    else {
      this.likedPlace().splice(idx, 1);
    }
 }
  getLikedPlace(){
    return this.likedPlace();
  }
 getAllHousingLocations(): HouseingLocation[] {
  return this.housingLocationList;
}

getHousingLocationById(id: string): HouseingLocation | undefined {
  return this.housingLocationList.find(housingLocation => housingLocation.id === id);
}
submitApplication(firstName: string, lastName: string, email: string) {
  console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
}
}
