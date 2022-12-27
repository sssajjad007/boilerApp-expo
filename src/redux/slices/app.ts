import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  isConnected: boolean;
  internetAvailable: boolean;
  vpn: boolean;
};

const initialState: State = {
  isConnected: true,
  internetAvailable: true,
  vpn: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setConnection(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    setInternet(state, action: PayloadAction<boolean>) {
      state.internetAvailable = action.payload;
    },
    setVpn(state, action: PayloadAction<boolean>) {
      state.vpn = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setConnection, setInternet } = appSlice.actions;
