"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const browserSnapshot = () => true;
const serverSnapshot = () => false;

// Keep sensitive forms inert until their client submit handlers are attached.
export function useLabHydrated() {
  return useSyncExternalStore(subscribe, browserSnapshot, serverSnapshot);
}
