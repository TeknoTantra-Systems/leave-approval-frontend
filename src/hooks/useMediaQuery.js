import { useSyncExternalStore } from "react";

function getMediaQuerySnapshot(query) {
  return window.matchMedia(query).matches;
}

function subscribeToMediaQuery(query, callback) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (callback) => subscribeToMediaQuery(query, callback),
    () => getMediaQuerySnapshot(query),
    () => false
  );
}

export default useMediaQuery;
