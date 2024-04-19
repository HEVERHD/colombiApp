import axios from "axios";
import { Presidents } from "../models/presidents.models";

export const getPresidents = () => {
  return axios.get<Presidents>(
    "https://api-colombia.com/api/v1/President"
  );
};