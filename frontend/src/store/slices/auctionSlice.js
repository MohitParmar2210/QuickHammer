

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// 🌐 BASE URL FROM ENV (PRODUCTION SAFE)
const BASE_URL = import.meta.env.VITE_API_URL;

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidders: {},
    myAuctions: [],
    allAuctions: [],
  },
  reducers: {
    createAuctionRequest(state) {
      state.loading = true;
    },
    createAuctionSuccess(state) {
      state.loading = false;
    },
    createAuctionFailed(state) {
      state.loading = false;
    },

    getAllAuctionItemRequest(state) {
      state.loading = true;
    },
    getAllAuctionItemSuccess(state, action) {
      state.loading = false;
      state.allAuctions = action.payload;
    },
    getAllAuctionItemFailed(state) {
      state.loading = false;
    },

    getAuctionDetailRequest(state) {
      state.loading = true;
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = false;
      state.auctionDetail = action.payload.auctionItem;
      state.auctionBidders = action.payload.bidders;
    },
    getAuctionDetailFailed(state) {
      state.loading = false;
    },

    getMyAuctionsRequest(state) {
      state.loading = true;
      state.myAuctions = [];
    },
    getMyAuctionsSuccess(state, action) {
      state.loading = false;
      state.myAuctions = action.payload;
    },
    getMyAuctionsFailed(state) {
      state.loading = false;
      state.myAuctions = [];
    },

    deleteAuctionItemRequest(state) {
      state.loading = true;
    },
    deleteAuctionItemSuccess(state) {
      state.loading = false;
    },
    deleteAuctionItemFailed(state) {
      state.loading = false;
    },

    republishItemRequest(state) {
      state.loading = true;
    },
    republishItemSuccess(state) {
      state.loading = false;
    },
    republishItemFailed(state) {
      state.loading = false;
    },
  },
});

// ================= ACTIONS =================

// GET ALL AUCTIONS
export const getAllAuctionItems = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionItemRequest());
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/auctionitem/allitems`,
      { withCredentials: true }
    );

    dispatch(
      auctionSlice.actions.getAllAuctionItemSuccess(response.data.items)
    );
  } catch (error) {
    dispatch(auctionSlice.actions.getAllAuctionItemFailed());
    console.error(error);
  }
};

// MY AUCTIONS
export const getMyAuctionItems = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionsRequest());
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/auctionitem/myitems`,
      { withCredentials: true }
    );

    dispatch(auctionSlice.actions.getMyAuctionsSuccess(response.data.items));
  } catch (error) {
    dispatch(auctionSlice.actions.getMyAuctionsFailed());
    console.error(error);
  }
};

// AUCTION DETAIL
export const getAuctionDetail = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getAuctionDetailRequest());
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/auctionitem/auction/${id}`,
      { withCredentials: true }
    );

    dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));
  } catch (error) {
    dispatch(auctionSlice.actions.getAuctionDetailFailed());
    console.error(error);
  }
};

// CREATE AUCTION
export const createAuction = (data) => async (dispatch) => {
  dispatch(auctionSlice.actions.createAuctionRequest());
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auctionitem/create`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(auctionSlice.actions.createAuctionSuccess());
    toast.success(response.data.message);

    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(auctionSlice.actions.createAuctionFailed());
    toast.error(error?.response?.data?.message || "Error");
    console.error(error);
  }
};

// REPUBLISH AUCTION
export const republishAuction = (id, data) => async (dispatch) => {
  dispatch(auctionSlice.actions.republishItemRequest());
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/auctionitem/item/republish/${id}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(auctionSlice.actions.republishItemSuccess());
    toast.success(response.data.message);

    dispatch(getMyAuctionItems());
    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(auctionSlice.actions.republishItemFailed());
    toast.error(error?.response?.data?.message || "Error");
    console.error(error);
  }
};

// DELETE AUCTION
export const deleteAuction = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.deleteAuctionItemRequest());
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/auctionitem/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(auctionSlice.actions.deleteAuctionItemSuccess());
    toast.success(response.data.message);

    dispatch(getMyAuctionItems());
    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(auctionSlice.actions.deleteAuctionItemFailed());
    toast.error(error?.response?.data?.message || "Error");
    console.error(error);
  }
};


export default auctionSlice.reducer;