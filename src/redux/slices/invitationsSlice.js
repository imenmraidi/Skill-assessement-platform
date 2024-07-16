import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAuth from "../../axiosConfig";
import axios from "axios";
const initialState = {
  invitations: [],
  candidates: [],
  status: "idle",
};

export const getTestCandidates = createAsyncThunk(
  "invitations/getTestCandidates",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.get(`candidate/test/${data.testId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const getTestInvitations = createAsyncThunk(
  "invitations/getTestInvitations",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.get(`/invitations/${data.testId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const updateTestResults = createAsyncThunk(
  "invitations/updateTestResults",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.put("/results/corrigeRep", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const deleteInvitation = createAsyncThunk(
  "invitations/deleteInvitation",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.delete(`/invitations/${data.idi}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateInvitation = createAsyncThunk(
  "invitations/extendDeadline",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.put("/invitations/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const updateCandidate = createAsyncThunk(
  "invitations/updateCandidate",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.put(`/candidate/${data.id}`, {
        email: data.email,
        fullname: data.fullname,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    addInvitation: (state, action) => {
      state.invitations = state.invitations.filter(
        i =>
          !action.payload.invitations
            .map(a => a.candidateId)
            .includes(i.candidateId)
      );
      state.invitations = [...state.invitations, ...action.payload.invitations];
      if (action.payload.newCandidates.length !== 0) {
        state.candidates = [
          ...state.candidates,
          ...action.payload.newCandidates,
        ];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTestInvitations.pending, state => {
        state.status = "loading";
      })
      .addCase(getTestInvitations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invitations = action.payload;
      })
      .addCase(getTestInvitations.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getTestCandidates.pending, state => {
        state.status = "loading";
      })
      .addCase(getTestCandidates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidates = action.payload;
      })
      .addCase(getTestCandidates.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateTestResults.pending, state => {
        state.status = "loading";
      })
      .addCase(updateTestResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.invitations.findIndex(
          i => i.id === action.payload.id
        );
        state.invitations[index] = action.payload;
      })
      .addCase(updateTestResults.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteInvitation.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteInvitation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invitations = state.invitations.filter(
          i => i.id !== action.payload.id
        );
      })
      .addCase(deleteInvitation.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateInvitation.pending, state => {
        state.status = "loading";
      })
      .addCase(updateInvitation.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.invitations.findIndex(
          i => i.id === action.payload.id
        );
        state.invitations[index] = action.payload;
      })
      .addCase(updateInvitation.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateCandidate.pending, state => {
        state.status = "loading";
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.candidates.findIndex(
          i => i.id === action.payload.id
        );
        state.candidates[index] = action.payload;
      })
      .addCase(updateCandidate.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const { addInvitation } = invitationsSlice.actions;

export default invitationsSlice.reducer;
