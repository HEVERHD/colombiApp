import { Aiports } from "../models/aiports.model";
import { City } from "../models/city.model";
import { Colombia } from "../models/colombia.model";
import { Page } from "../models/page.model";

export default class ColombiaService {
  static getTotalDepartments() {
    throw new Error('Method not implemented.');
  }

  private static readonly API_ENDPOINT: string = 'https://api-colombia.com/api/v1';

  private static readonly PAGE_SIZE: number = 60;

  public static async getColombiaInfo(): Promise<Colombia | undefined> {
    return fetch(`${ColombiaService.API_ENDPOINT}/country/Colombia`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(`Error getting colombia info:`, e);
        return undefined;
      });
  }

  public static async getPresidents(): Promise<Colombia | undefined> {
    return fetch(`${ColombiaService.API_ENDPOINT}/president`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(`Error getting colombia info:`, e);
        return undefined;
      });
  }

  public static async getCities(page: number): Promise<Page<City> | undefined> {
    return fetch(`${ColombiaService.API_ENDPOINT}/City/PagedList?page=${page}&pageSize=${ColombiaService.PAGE_SIZE}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(`Error getting paginated cities:`, e);
        return undefined;
      });
  }

  public static async getTotalCities(): Promise<City> {
    return fetch(`${ColombiaService.API_ENDPOINT}/City`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(`Error getting paginated cities:`, e);
        return undefined;
      });
  }

  public static async searchCities(text: string): Promise<City | undefined> {
    return fetch(`${ColombiaService.API_ENDPOINT}/City/search/${text}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(`Error SearchCities`, e);
        return undefined;
      });
  }

  public static async getAirports(): Promise<Aiports | undefined> {
    return fetch(`${ColombiaService.API_ENDPOINT}/Airport`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(`Error getting colombia info:`, e);
        return undefined;
      });
  }



}