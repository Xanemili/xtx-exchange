import { baseUrl } from '../config'
import {Ticker, AssetListType, removeList} from '../store/listSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import store from '../store/store'
import { loadLists, loadListFailure, resetLists, loadingLists, addList } from '../store/listSlice'
import { createAlert } from '../store/alertSlice'

export const getLists = async (token: string) => {

  store.dispatch(loadingLists())

  const res = await fetch(`${baseUrl}/list`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    const lists = await res.json()

    if (Array.isArray(lists) && lists.length > 0) {
      store.dispatch(loadLists(lists))
      store.dispatch(createAlert({payload: { id: 10, message: 'New List Successful', type: 'success'}}))
    } else {
      store.dispatch(resetLists())
    }
  } else {
    store.dispatch(loadListFailure())
  }
}

export const deleteListItem = async (token: string, id: Number, security: Ticker) => {

  const res = await fetch(`${baseUrl}/list/${id}/security/${security}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    return res.json()
  } else {
    return 'There was an error'
  }
}

export const addListItem = async (token: string, id: string, security: Ticker) => {

  const res = await fetch(`${baseUrl}/list/${id}/security/${security}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    return res.json()
  } else {
    return 'There was an error'
  }
}

export const createList = async (data: AssetListType) => {

  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/list/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const newList = await res.json()
    store.dispatch(addList(newList))
    store.dispatch(createAlert({message: 'Success: List was created', alertType: 'success'}))
  } else {
    store.dispatch(loadListFailure())
  }
}


// TO DO: Implement as a thunk!
export const deleteList = async (id: number) => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/list/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if(res.ok) {
    store.dispatch(removeList(id))
  } else {
    store.dispatch(loadListFailure())
  }
}

export const deleteListById = createAsyncThunk('lists/deleteListById', async (listId: number, thunkAPI) => {
  const response = await deleteList(listId)
})

export const getMovers = async() => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${baseUrl}/assets/movers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if(res.ok) {
    const data = await res.json()
    return data
  } else {
    return
  }
}