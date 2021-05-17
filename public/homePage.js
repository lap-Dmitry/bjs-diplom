"use strict";
const userLogout = new LogoutButton();

userLogout.action = () => ApiConnector.logout(response => {
    if(response.success) {
      location.reload();
    }
  });
