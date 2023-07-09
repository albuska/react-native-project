import db from "../../firebase/config";
import authSlice from "./authSlice";

export const register =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log("login ---->", login);
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login.trim(),
      });

      const { uid, displayName } = await db.auth().currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user ---->", user);
    } catch (error) {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
      throw error;
    }
  };

export const logout = () => async (dispatch, getState) => {
  try {
    await db.auth().signOut();
    dispatch(
      authSlice.actions.authLogout()
    );
  } catch (error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
    throw error;
  }
 };

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await db.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            login: user.displayName,
          })
        );
        dispatch(
          authSlice.actions.authStateChange({
            stateChange: true,
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
    throw error;
  }
};
