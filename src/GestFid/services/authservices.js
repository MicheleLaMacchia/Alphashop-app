class AuthenticationService {
  saveUserInfo = (username) => sessionStorage.setItem("user", username);

  cleanUserInfo = () => sessionStorage.removeItem("user");

  getUserInfo = () => sessionStorage.getItem("user");

  isLogged = () => {
    let user = this.getUserInfo();
    if (user === null) {
      return false;
    } else {
      return true;
    }
  };
}

export default new AuthenticationService();
