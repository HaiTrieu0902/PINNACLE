import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from './redux/authToken';
import dashbroadSlice from './redux/dashbroad.slice';
import releaseSlice from './redux/release.slice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        dashbroad: dashbroadSlice,
        release: releaseSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
