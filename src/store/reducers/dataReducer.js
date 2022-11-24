import { createSlice } from "@reduxjs/toolkit";
// import { stat } from "original-fs";

const dataInitialState = {
    graph: []
}


const dataSlice = createSlice({
    name: 'wifi-data',
    initialState: dataInitialState,
    reducers: {
        getGraph(state, action) {
            if (state.graph.length > 25) {
                state.graph = [...state.graph.slice(1), action.payload]
            }
            else {
                state.graph = [...state.graph, action.payload]
            }
        },
        clearGraph(state,action){
            state.graph = []
        }
    }
})

export const dataAction = dataSlice.actions
export default dataSlice.reducer