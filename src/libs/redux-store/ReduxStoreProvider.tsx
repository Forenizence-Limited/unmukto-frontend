'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { type AppStore, makeStore } from '@/libs/redux-store/store';

export default function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const storeRef = useRef<AppStore>();
  if (storeRef.current == null) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
