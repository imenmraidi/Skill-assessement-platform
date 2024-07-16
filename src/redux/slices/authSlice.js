import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAuth from "../../axiosConfig";
import axios from "axios";

const currentuser = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: currentuser ? currentuser : null,
  userInfo: {},
  status: "idle",
};

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post("http://localhost:3000/login", data, {
      withCredentials: true,
      credentials: "include",
    });
    const user = {
      id: response.data.id,
      fullname: response.data.fullname,
    };

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    return rejectWithValue({ response: error.response });
  }
});
export const loginCandidate = createAsyncThunk(
  "user/loginCandidate",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:3000/loginCandidate",
        data,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      const user = {
        id: response.data.id,
      };
      localStorage.setItem("candidate", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({ response: error.response });
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.post("http://localhost:3000/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `http://localhost:3000/recruiter/signup`,
        data,
        { timeout: 5000 }
      );
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data.message);
      else if (error.request)
        return rejectWithValue(
          "Une erreur s'est produite, essayez ultérieurement"
        );
      else
        return rejectWithValue(
          "Une erreur s'est produite, essayez ultérieurement"
        );
    }
  }
);
export const getRecruiter = createAsyncThunk(
  "user/getRecruiter",
  async (_, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
    try {
      const response = await axiosAuth.get(`/recruiter/${getState().auth.user.id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateRecruiter = createAsyncThunk(
  "user/updateRecruiter",
  async (data, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
    try {
      const response = await axiosAuth.put(`/recruiter/${getState().auth.user.id}`,data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
    },
    [logout.pending]: (state, action) => {
      state.status = "pending";
    },
    [logout.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = null;
    },
    [logout.rejected]: (state, action) => {
      state.status = "failed";
    },
    [signUp.pending]: (state, action) => {
      state.status = "pending";
    },
    [signUp.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [signUp.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getRecruiter.pending]: (state, action) => {
      state.status = "pending";
    },
    [getRecruiter.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userInfo = action.payload;
    },
    [getRecruiter.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateRecruiter.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateRecruiter.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userInfo = action.payload;
    },
    [updateRecruiter.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default authSlice.reducer;
