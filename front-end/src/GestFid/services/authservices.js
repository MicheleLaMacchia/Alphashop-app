export const saveUserInfo = (username) =>
  sessionStorage.setItem("user", username);

export const cleanUserInfo = () => sessionStorage.removeItem("user");

export const getUserInfo = () => sessionStorage.getItem("user");

export const isLogged = () => {
  let user = getUserInfo();
  if (user === null) {
    return false;
  } else {
    return true;
  }
};
