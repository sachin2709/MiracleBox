import { API } from "../../backend";

export const signup = (user) => {
  return fetch(`http://localhost:9000/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`http://localhost:9000/api/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = async (data, next) => {
  console.log(window)
  if (typeof window !== "undefined") {
     localStorage.setItem("jwtToken", JSON.stringify(data));
    console.log(localStorage.getItem("jwtToken"))
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwtToken");
  }
  next();
  return fetch(`http://localhost:9000/api/signout`, {
    method: "GET",
  })
    .then((response) => console.log("Sign Out success"))
    .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  console.log(localStorage.getItem("jwtToken"))
  if (localStorage.getItem("jwtToken")) {
    return JSON.parse(localStorage.getItem("jwtToken"));
  } else {
    return false;
  }
};