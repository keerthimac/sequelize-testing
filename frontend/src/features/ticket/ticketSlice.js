import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //1st step
import ticketService from "./ticketService";

const initialState = {
  ticket: {},
  tickets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create Ticket
export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticket, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; // if we need another state data, ThunkAPI can use like this
      return await ticketService.createTicket(ticket, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get user Ticket
export const getTickets = createAsyncThunk(
  "ticket/getTickets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token; // if we need another state data, ThunkAPI can use like this
      return await ticketService.getTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTicket.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Ticket Submitted Successfully";
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.ticket = null;
    });
    builder.addCase(getTickets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = "Tickets Fetched Successfully";
      state.tickets = action.payload;
    });
    builder.addCase(getTickets.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = ticketSlice.actions;
export const { resetTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
