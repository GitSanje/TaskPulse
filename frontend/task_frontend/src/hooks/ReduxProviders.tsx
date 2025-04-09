"use client"

import { persistor,store } from "@/store/store"
import type React from "react"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"


export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}