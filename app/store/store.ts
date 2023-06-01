import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist"
import persistReducer from "redux-persist/es/persistReducer"
import { rootReducer } from "./root-reducer"
import { configureStore } from "@reduxjs/toolkit"

import storage from 'redux-persist/lib/storage'

//persistConig -- позволяет записывать данные в локалсторадж или куки сторадж
const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]// чтобы не было конфликтов с RTKQuery
        }
    })
})

export const persistor = persistStore(store) // чтобы записать в персист провайдер реакта

export type TypeRootState = ReturnType<typeof rootReducer>