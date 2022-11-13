import axios from "axios";

export const apiCall = async (options) => {
  try {
    const response = await axios(options);
    return {
      ok: true,
      res: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      res:
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.description) ||
        "",
    };
  }
};

export const get = ({ url, params }) => {
  const options = {
    url,
    method: "GET",
  };
  if (params) {
    options.params = params;
  }
  return apiCall(options);
};
export const post = async ({ url, body, params }) => {
  const options = {
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };
  if (params) {
    options.params = params;
  }
  return apiCall(options);
};
