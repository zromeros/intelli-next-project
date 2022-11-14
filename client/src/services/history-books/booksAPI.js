import { baseURL } from "../enviroment";
import * as Methods from "../methods";

const endpoints = {
  books: `${baseURL}/list`,
  constants: `${baseURL}/constants`,
};

export const listBooks = async (body) => {
  return await Methods.post({ url: endpoints.books, body });
};

export const getConstants = async () => {
  return await Methods.get({ url: endpoints.constants });
};
