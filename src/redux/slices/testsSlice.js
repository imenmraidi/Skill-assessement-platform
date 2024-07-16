import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAuth from "../../axiosConfig";
import axios from "axios";
import { addInvitation } from "./invitationsSlice";

const initialState = {
  tests: [],
  status: "idle",
};

export const getTests = createAsyncThunk(
  "tests/getTests",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.get(`/test/recruiter/${data.id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createTest = createAsyncThunk(
  "tests/createTest",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.post("/test", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const updateTest = createAsyncThunk(
  "tests/updateTest",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.put(`/test/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const createQuestion = createAsyncThunk(
  "tests/createQuestion",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.post("/question", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const updateQuestion = createAsyncThunk(
  "tests/updateQuestion",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.put("/question", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  "tests/deleteQuestion",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.delete(`/question/${data.idq}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteTest = createAsyncThunk(
  "tests/deleteTest",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.delete(`/test/${data.idt}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createInvitation = createAsyncThunk(
  "tests/createInvitation",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.post(`/invitations`, data);
      thunkAPI.dispatch(addInvitation(response.data));
      return response.data.invitations;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTests.pending, state => {
        state.status = "loading";
      })
      .addCase(getTests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tests = action.payload;
      })
      .addCase(getTests.rejected, state => {
        state.status = "failed";
      })
      .addCase(createTest.pending, state => {
        state.status = "loading";
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tests.push(action.payload);
      })
      .addCase(createTest.rejected, state => {
        state.status = "failed";
      })
      .addCase(updateTest.pending, state => {
        state.status = "loading";
      })
      .addCase(updateTest.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tests.findIndex(t => {
          return t.id === action.payload.id;
        });
        state.tests[index] = action.payload;
      })
      .addCase(updateTest.rejected, state => {
        state.status = "failed";
      })
      .addCase(deleteTest.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tests = state.tests.filter(t => t.id !== action.payload.id);
      })

      .addCase(deleteTest.rejected, state => {
        state.status = "failed";
      })
      .addCase(createQuestion.pending, state => {
        state.status = "loading";
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tests.findIndex(t => {
          return t.id === action.payload.Question.testId;
        });
        state.tests[index].questions.push(action.payload.Question);
      })
      .addCase(createQuestion.rejected, state => {
        state.status = "failed";
      })
      .addCase(updateQuestion.pending, state => {
        state.status = "loading";
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tests.findIndex(t => {
          return t.id === action.payload.testId;
        });
        state.tests[index].questions = state.tests[index].questions.map(q => {
          return q.id === action.payload.id ? action.payload : q;
        });
      })
      .addCase(updateQuestion.rejected, state => {
        state.status = "failed";
      })
      .addCase(deleteQuestion.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tests.findIndex(t => {
          return t.id === action.payload.testId;
        });
        state.tests[index].questions = state.tests[index].questions.filter(
          q => q.id !== action.payload.id
        );
      })
      .addCase(deleteQuestion.rejected, state => {
        state.status = "failed";
      })
      .addCase(createInvitation.pending, state => {
        state.status = "loading";
      })
      .addCase(createInvitation.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tests.findIndex(t => {
          return t.id === action.payload[0].testId;
        });
        state.tests[index].candidates = state.tests[index].candidates.filter(
          i => !action.payload.map(a => a.candidateId).includes(i.candidateId)
        );
        state.tests[index].candidates = [
          ...state.tests[index].candidates,
          ...action.payload,
        ];
      })
      .addCase(createInvitation.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default testsSlice.reducer;
