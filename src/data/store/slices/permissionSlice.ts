import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createClient } from '@rt/authentication/client';
import { RootState } from '@rt/data/store';

interface PermissionState {
  permissions: string[];
  loaded: boolean;
}

const initialState: PermissionState = {
  permissions: [],
  loaded: false,
};

export const fetchPermissions = createAsyncThunk(
  'permission/fetchPermissions',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.permission.loaded) return state.permission.permissions;

    const { auth } = createClient();
    const {
      data: { session },
    } = await auth.getSession();
    return session?.user?.user_metadata?.permission ?? [];
  }
);

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    clearPermissions: (state) => {
      state.permissions = [];
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPermissions.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.permissions = action.payload;
        state.loaded = true;
      }
    );
  },
});

export const { clearPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;
