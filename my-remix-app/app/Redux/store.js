import { combineReducers, configureStore} from '@reduxjs/toolkit'
import dashbordSlice from "../Slice/dashborad/dashbordSlice";

export const store = configureStore({
        reducer: {dashbordSlice}
})


