import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export interface ISliceModal {
  active: boolean;
  Component: React.FC | null;
  data: any;
  title:string;
  width:string|null;
  left:string|null;
}

const data: ISliceModal = {
  active: false,
  data: {},
  Component: null,
  title:"",
  width:"",
  left:"",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    data: data,
  },
  reducers: {
    modalSet: (state, action) => {
      state.data = action.payload;
    },
  },
  
});

export const { modalSet } = modalSlice.actions;

export const selectModal = (state: any) => state.modal.data;

export default modalSlice.reducer;