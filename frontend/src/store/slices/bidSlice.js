
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuctionDetail } from "./auctionSlice";

const BASE_URL = "https://quickhammer-n0l1.onrender.com";

const bidSlice = createSlice({
  name: "bid",
  initialState: {
    loading: false,
  },
  reducers: {
    bidRequest(state) {
      state.loading = true;
    },
    bidSuccess(state) {
      state.loading = false;
    },
    bidFailed(state) {
      state.loading = false;
    },
  },
});

// PLACE BID
export const placeBid = (id, data) => async (dispatch) => {
  dispatch(bidSlice.actions.bidRequest());
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/bid/place/${id}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(bidSlice.actions.bidSuccess());
    toast.success(response.data.message);

    // refresh auction detail after bid
    dispatch(getAuctionDetail(id));
  } catch (error) {
    dispatch(bidSlice.actions.bidFailed());
    toast.error(error?.response?.data?.message || "Error placing bid");
    console.error(error);
  }
};

export default bidSlice.reducer;