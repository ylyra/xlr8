import axios from "axios";

export const api = axios.create({
  baseURL: process.env.XLR8_API_URL,
});
