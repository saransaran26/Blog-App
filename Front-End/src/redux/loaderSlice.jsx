import { createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
    name:'loaders',
    initialState:{
        loading:false
    },
    reducers:{
        setloading:(state,action)=>{
            state.loading = action.payload
        }
    }
})

export const {setloading} = loaderSlice.actions

export default loaderSlice.reducer