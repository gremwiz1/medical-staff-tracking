import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../types/types";

interface DoctorsState {
  doctors: Doctor[];
}

const initialState: DoctorsState = {
  doctors: [
    { id: 1, fullName: "Иван Иванов", department: "кардиологическое", isHead: true },
    { id: 2, fullName: "Петр Петров", department: "хирургическое", isHead: false },
  ],
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    addDoctor: (state, action: PayloadAction<Doctor>) => {
      state.doctors.push(action.payload);
    },
    editDoctor: (state, action: PayloadAction<Doctor>) => {
      const index = state.doctors.findIndex((d) => d.id === action.payload.id);
      if (index >= 0) state.doctors[index] = action.payload;
    },
    deleteDoctor: (state, action: PayloadAction<number>) => {
      state.doctors = state.doctors.filter((d) => d.id !== action.payload);
    },
  },
});

export const { addDoctor, editDoctor, deleteDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;
