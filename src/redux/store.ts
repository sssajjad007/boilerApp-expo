import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

let flipperMiddlewares: any = null;

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  flipperMiddlewares = createDebugger();
}
import salesReducer from './slices/sales';
import userReducer from './slices/user';
import branchSlice from './slices/branch';
import appSlice from './slices/app';
const store = configureStore({
  reducer: {
    sales: salesReducer,
    user: userReducer,
    branch: branchSlice,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    __DEV__ ? getDefaultMiddleware().concat(flipperMiddlewares) : getDefaultMiddleware(),
});

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
