import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL, getCategory } from "../assets/Data";

const initialState = {
  loading: false,
  feed1: [],
  feed2: [],
  queryString: undefined,
  displayData: [],
  displayName: undefined,
};

export const getFeedData = createAsyncThunk("feed/featured", async () => {
  const response1 = await fetch(
    `${BACKEND_URL}/api/getInfluencers/featured/feed`
  );
  const data = await response1.json();

  return data;
});

export const getDisplayData = createAsyncThunk(
  "feed/display-data",
  async (query) => {
    let displayData, displayName;
    if (query !== undefined && Object.keys(query).length !== 0) {
      let categories = getCategory(-1);
      let url = `${BACKEND_URL}/api/getInfluencers/search/?`;
      if (query.fmax !== undefined) url += `&fmax=${query.fmax}`;
      if (query.fmin !== undefined) url += `&fmin=${query.fmin}`;
      if (query.region !== undefined) url += `&region=${query.region}`;
      if (query.platform !== undefined) {
        let platform = query.platform;

        if (query.platform === "All") {
          platform = ["Instagram", "YouTube"];
        }
        url += `&platform=${platform}`;
      }
      if (query.field !== undefined) {
        let indexedFields = [];
        for (let value of query.field) {
          for (let i = 0; i < categories.length; i++) {
            if (categories[i] === value) {
              indexedFields.push(i);
            }
          }
        }

        url += `&field=${indexedFields}`;
      }
      const response = await fetch(url);
      let data = await response.json();

      displayData = data.data;
      displayName = "Search result for your query";
    } else {
      const response = await fetch(
        `${BACKEND_URL}/api/getInfluencers/featured/platform/instagram`
      );
      let data = await response.json();

      displayData = data.data;
      displayName = "Featured";
    }
    return {query, displayData, displayName};
  }
);

const FeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.loading = false;
        state.feed1 = action.payload.feed1;
        state.feed2 = action.payload.feed2;
      })
      .addCase(getFeedData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDisplayData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDisplayData.fulfilled, (state, action) => {
        state.loading = false;
        state.queryString = action.payload.query;
        state.displayData = action.payload.displayData;
        state.displayName = action.payload.displayName;
      })
      .addCase(getDisplayData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default FeedSlice.reducer;
