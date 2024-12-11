import AsyncStorage from "@react-native-async-storage/async-storage";
// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
let timer;
export const authenticate = (userId, token, mode, expriesTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expriesTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      mode: mode,
      // expriesTime : expriesTime
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAty2hGKwF2xlKEdfdF3EFXf-bhnw2rtIg",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      // console.log(errorResData);
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        resData.registered,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    SaveDateToStorage(
      resData.idToken,
      resData.localId,
      resData.registered,
      expirationDate
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAty2hGKwF2xlKEdfdF3EFXf-bhnw2rtIg",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      // throw new Error("Something went wrong when signing")
      const errorResData = await response.json();
      const erroId = errorResData.error.message;
      let message = "Something went wrong when signing";
      if (erroId === "EMAIL_NOT_FOUND") {
        message = "this Email could not be found !";
      } else if (erroId === "INVALID_PASSWORD") {
        message =
          "The password is invalid or the user does not have a password";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData.registered);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        resData.registered,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    SaveDateToStorage(
      resData.idToken,
      resData.localId,
      resData.registered,
      expirationDate
    );
  };
};
export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime );
  };
};

const SaveDateToStorage = (token, userId, mode, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      mode: mode,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
