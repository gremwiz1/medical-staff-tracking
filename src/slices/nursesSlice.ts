import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nurse } from "../types/types";

interface NursesState {
  nurses: Nurse[];
}

const initialState: NursesState = {
  nurses: [
    { id: 1, fullName: "Анна Смирнова", department: "кардиологическое" },
    { id: 2, fullName: "Ольга Иванова", department: "хирургическое" },
  ],
};

const nursesSlice = createSlice({
  name: "nurses",
  initialState,
  reducers: {
    addNurse: (state, action: PayloadAction<Nurse>) => {
      state.nurses.push(action.payload);
    },
    editNurse: (state, action: PayloadAction<Nurse>) => {
      const index = state.nurses.findIndex((n) => n.id === action.payload.id);
      if (index >= 0) state.nurses[index] = action.payload;
    },
    deleteNurse: (state, action: PayloadAction<number>) => {
      state.nurses = state.nurses.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNurse, editNurse, deleteNurse } = nursesSlice.actions;
export default nursesSlice.reducer;
