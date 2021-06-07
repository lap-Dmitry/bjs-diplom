"use strict";
const userLogout = new LogoutButton();

userLogout.action = () => ApiConnector.logout(response => {
    if(response.success) {
      location.reload();
    }
  });

  ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
  });

  const ratesBoard = new RatesBoard();
  function exchangeRates() {
    ApiConnector.getStocks((response) => {
      if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
      }
    });
  };
  exchangeRates();
  setInterval(exchangeRates, 60000);

  const moneyManager = new MoneyManager();
  moneyManager.addMoneyCallback = (data) => {
      ApiConnector.addMoney(data, responce => {
        if (responce.success) {
          ProfileWidget.showProfile(responce.data);
          moneyManager.setMessage(responce.success, 'баланс успешно пополнен')
        }else {
          moneyManager.setMessage(responce.success, responce.data);
        }
      });
  }

  moneyManager.conversionMoneyCallback = (data) => {
      ApiConnector.convertMoney(data, responce => {
        if (responce.success) {
          ProfileWidget.showProfile(responce.data);
          moneyManager.setMessage(responce.success, 'конвертация успешно выполнена')
        }else {
          moneyManager.setMessage(responce.success, responce.data);
        }
      });
  }

  moneyManager.sendMoneyCallback = (data) => {
      ApiConnector.transferMoney(data, responce => {
        if (responce.success) {
          ProfileWidget.showProfile(responce.data);
          moneyManager.setMessage(responce.success, 'перевод успешно выполнен')
        }else {
          moneyManager.setMessage(responce.success, responce.data);
        }
      });
  }

  const favoritesWidget = new FavoritesWidget();
      ApiConnector.getFavorites(
         responce => {
        if (responce.success) {
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(responce.data);
          moneyManager.updateUsersList(responce.data);
        }else {
          favoritesWidget.setMessage(responce.error);
        }
      });

      favoritesWidget.addUserCallback = (data) => {
        ApiConnector.addUserToFavorites(data, responce => {
          if (responce.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager.updateUsersList(responce.data);
            favoritesWidget.setMessage(responce.success, 'пользователь успешно добавлен')
          }else {
            favoritesWidget.setMessage(responce.success, responce.error);
          }
        });
      }

      favoritesWidget.removeUserCallback = (data) => {
        ApiConnector.removeUserFromFavorites (data, responce => {
          if (responce.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager.updateUsersList(responce.data);
            favoritesWidget.setMessage(responce.success, 'пользователь удален')
          }else {
            favoritesWidget.setMessage(responce.success, responce.error);
          }
        });
      }
