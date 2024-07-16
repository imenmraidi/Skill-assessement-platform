import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import testsReducer from "./slices/testsSlice";
import invitationsReducer from "./slices/invitationsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    tests: testsReducer,
    invitations: invitationsReducer,
  },
});
