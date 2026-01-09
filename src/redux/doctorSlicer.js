import { createSlice } from "@reduxjs/toolkit";

const initialState={
     profile: null,
  loading: false,
  error: null,
  lastFetched: null,
  stats:null,
  verified:null
}

const doctorSlicer = createSlice({
      name: "user",
  initialState,
  reducers: {
    setDoctor: (state, action) => {
      state.profile = action.payload;
      state.lastFetched = Date.now();
      state.loading = false;
      state.error = null;
    },
    checkVerification:(state,action)=>{
state.verified=action.payload;
    },
    setDoctorState: (state,action) => {
        state.stats=action.payload;
     
    }, 
   updateDoctorProfile: (state, action) => {
  state.profile.patientProfile = action.payload;
   
},
    doctorError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDoctor: (state) => {
      state.profile = null;
      state.lastFetched = null;
    },
}
});

export const { setDoctor, setDoctorState,checkVerification, updateDoctorProfile, doctorError, clearDoctor } =
  doctorSlicer.actions;
export default doctorSlicer.reducer;