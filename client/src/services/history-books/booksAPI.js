import { baseURL } from "../enviroment";
import * as Methods from "../methods";

const endpoints = {
  history: `${baseURL}/all`,
};

const getBooks = async () => {
  return await Methods.get({ url: endpoints.history });
};

export { getBooks };
