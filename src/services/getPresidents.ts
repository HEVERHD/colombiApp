import axios from "axios";
import { Presidents } from "../models/presidents.models";

// Get all presidents
export const getPresidents = () => {
  return axios.get<Presidents>(
    "https://api-colombia.com/api/v1/President"
  );
};

// Get president details by id
export const getPresidentDetails = (id: string) => { 
  return axios.get<Presidents>(
    `https://api-colombia.com/api/v1/President/${id}` 
  );
};

// Get presidents by search query
export const searchPresidents = (keyword: string) => {
  return axios.get<Presidents>(
    `https://api-colombia.com/api/v1/President/search/${keyword}`
  );
};



// Get presidents with pagination
export const getPresidentsPagedList = (page: number, pageSize: number) => {
  return axios.get<Presidents>(
    `https://api-colombia.com/api/v1/President/pagedList?Page=${page}&PageSize=${pageSize}`
  );
};
