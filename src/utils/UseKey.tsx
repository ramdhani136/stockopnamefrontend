import { useRef, useEffect } from "react";

interface IComb {
  ctrl?: boolean;
  alt?: boolean;
}

const useKey = (key: String, cb: any, comb?: IComb) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    const handle = (event: any) => {
      if (comb?.ctrl && !comb.alt) {
        if ((event.ctrlKey || event.metaKey) && event.key === key) {
          callbackRef.current(event);
        }
      } else if (comb?.ctrl && comb.alt) {
        if (
          (event.ctrlKey || event.metaKey) &&
          event.altKey &&
          event.key === key
        ) {
          callbackRef.current(event);
        }
      } else {
        if (event.key === key) {
          callbackRef.current(event);
        }
      }
    };

    document.addEventListener("keydown", handle);

    return () => {
      document.removeEventListener("keydown", handle);
    };
  }, [key]);
};

export default useKey;
