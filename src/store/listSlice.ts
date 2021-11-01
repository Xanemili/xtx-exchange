import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export type AssetListData = {
  [id: number]: AssetListType
}

export type AssetListType = {
  id: number,
  name?: string,
  description?: string,
  Tickers?: Array<Ticker>
}

type Status = 'loading' | 'failure' | 'success' | 'setup'

type AssetListSlice = {
  data: AssetListData,
  status: Status
}

export type Ticker = {
  id: number,
  symbol: string,
  latestClose?: number,
}

const initialState: AssetListSlice = { status: 'setup', data: {}}

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    loadLists: (state: AssetListSlice, action) => {
      state.data = action.payload
      state.status = 'success'
      return state
    },
    removeList: (state: AssetListSlice, action) => {
      delete state.data[action.payload]
    },
    addList: (state: AssetListSlice, action) => {
      const {id, name, description, Tickers } = action.payload
      state.data[id] = {id, name, description, Tickers}
    },
    resetLists: (state: AssetListSlice) => {
      return initialState
    },
    addToList: (state: AssetListSlice, action) => {
      return state
    },
    loadingLists: (state: AssetListSlice) => {
      state.status = 'loading'
      return state
    },
    loadListFailure: (state: AssetListSlice) => {
      state.status = 'failure'
      return state
    }
  },
})

export const { loadLists, removeList, addList, loadListFailure, resetLists, loadingLists, } = listSlice.actions

export const selectList = (state: RootState, id: number) => state.lists.data[id]
export const selectLists = (state: RootState) => state.lists

export default listSlice.reducer