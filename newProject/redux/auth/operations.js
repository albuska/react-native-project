import db from "../../firebase/config";
import authSlice from "./authSlice";

export const register =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
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
