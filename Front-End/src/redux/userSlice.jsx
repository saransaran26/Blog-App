
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'users',
    initialState:{
        user:null
    },
    reducers:{
        adduser:(state,action)=>{
            state.user = action.payload
        }
    }
})

export const {adduser} = userSlice.actions

export default userSlice.reducer