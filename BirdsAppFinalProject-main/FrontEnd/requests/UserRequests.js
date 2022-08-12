import { BASE_URL } from "@env";
const base_url = BASE_URL + "user/";

const addNewUser = async (user) => {
  console.log("USER: " + JSON.stringify(user));
  const url = base_url + user.username;
  console.log(`url = ${url}`);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      user_type: user.user_type,
    }),
  };

  let res = await fetch(url, requestOptions);
  return res;
};

async function updateUser(user) {
  console.log("Update USER: " + JSON.stringify(user));
  const url = base_url + user.username;
  console.log(`url = ${url}`);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      email: user.email,
      user_type: user.user_type,
    }),
  };

  let res = await fetch(url, requestOptions);
  return res;
}

async function getUser(username) {
  console.log(`Got get request username =  ${username}`);

  const url = BASE_URL + "user/" + username;

  const user = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return user;
}

async function login(username, password) {
  console.log(`Log in request, username = ${username}`);
  const url = BASE_URL + "login/" + username;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password }),
  });

  return response;
}

module.exports = { addNewUser, getUser, updateUser, login };
