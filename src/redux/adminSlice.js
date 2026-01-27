import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersCount: null,
    doctorsCount: null
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setStats: (state, action) => {
            state.usersCount = action.payload.usersCount;
            state.doctorsCount = action.payload.doctorsCount;
        }
    }
});

export const { setStats } = adminSlice.actions;
export default adminSlice.reducer;