import { Injectable } from "@angular/core";
import { HousingLocation } from "./housinglocation";
import { environment } from "../environments/environment"; // Import environment for production check

@Injectable({
  providedIn: "root",
})
export class HousingService {
  readonly baseUrl = "https://angular.dev/assets/images/tutorials/common";
  url = "http://localhost:3000/locations";
  protected housingLocationList: HousingLocation[] = [
    {
      id: 0,
      name: "Acme Fresh Start Housing",
      city: "Chicago",
      state: "IL",
      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnits: 4,
      wifi: true,
      laundry: true,
    },
    {
      id: 1,
      name: "A113 Transitional Housing",
      city: "Santa Monica",
      state: "CA",
      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      availableUnits: 0,
      wifi: false,
      laundry: true,
    },
    {
      id: 2,
      name: "Warm Beds Housing Support",
      city: "Juneau",
      state: "AK",
      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      availableUnits: 1,
      wifi: false,
      laundry: false,
    },
    {
      id: 3,
      name: "Homesteady Housing",
      city: "Chicago",
      state: "IL",
      photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 4,
      name: "Happy Homes Group",
      city: "Gary",
      state: "IN",
      photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 5,
      name: "Hopeful Apartment Group",
      city: "Oakland",
      state: "CA",
      photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 6,
      name: "Seriously Safe Towns",
      city: "Oakland",
      state: "CA",
      photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      availableUnits: 5,
      wifi: true,
      laundry: true,
    },
    {
      id: 7,
      name: "Hopeful Housing Solutions",
      city: "Oakland",
      state: "CA",
      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 8,
      name: "Seriously Safe Towns",
      city: "Oakland",
      state: "CA",
      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      availableUnits: 10,
      wifi: false,
      laundry: false,
    },
    {
      id: 9,
      name: "Capital Safe Towns",
      city: "Portland",
      state: "OR",
      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      availableUnits: 6,
      wifi: true,
      laundry: true,
    },
  ];

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      if (environment.production) {
        // In production, return the local data
        return this.housingLocationList;
      }

      // Try fetching data from the API (JSON server)
      const data = await fetch(this.url);
      if (!data.ok) {
        throw new Error("Failed to fetch data from server.");
      }
      return await data.json();
    } catch (error) {
      console.error("Error fetching housing locations: ", error);
      // If there's an error (either production environment or fetch failure), return local data
      return this.housingLocationList;
    }
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    try {
      if (environment.production) {
        // In production, return the local data
        return this.housingLocationList.find((location) => location.id === id);
      }

      // Try fetching the specific housing location from the API
      const data = await fetch(`${this.url}/${id}`);
      if (!data.ok) {
        throw new Error("Failed to fetch data from server.");
      }
      return await data.json();
    } catch (error) {
      console.error("Error fetching housing location by ID: ", error);
      // If there's an error (either production environment or fetch failure), return the local data
      return this.housingLocationList.find((location) => location.id === id);
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
