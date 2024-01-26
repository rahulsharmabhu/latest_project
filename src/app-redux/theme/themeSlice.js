import { createSlice } from '@reduxjs/toolkit';

const themeConfig = {skin : 'dark'};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        skin: themeConfig.skin
    },
    reducers: {
        handleSkin: (state, action) => {
            state.skin = action.payload
            window.localStorage.setItem('skin', JSON.stringify(action.payload))
        }
    }, 
});

export const { resetErrorAction, handleSkin } = themeSlice.actions;
export default themeSlice.reducer;
