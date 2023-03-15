const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem(TOKEN),
  },
});

const requestImage = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ` + localStorage.getItem(TOKEN),
  },
});
