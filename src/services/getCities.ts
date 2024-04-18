import axios from "axios";
import { Cities } from "../models/useCities";


export const getCities = () => {
  return axios.get<Cities>(
    "https://api-colombia.com/api/v1/City"
  );
};