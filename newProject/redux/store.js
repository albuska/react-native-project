import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";
import authSlice from "./auth/authSlice";
import dashboardSlice from "./dashboard/dashboardSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [dashboardSlice.name]: dashboardSlice.reducer,
  // auth: authSlice.reducer,
  // dashboard: dashboardSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, rootReducer);
console.log(rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
