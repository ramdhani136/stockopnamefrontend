import { useRef, useEffect } from "react";

const useKey = (key: String, cb: any, ctrl?: boolean) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    const handle = (event: any) => {
      if (ctrl) {
        if ((event.ctrlKey || event.metaKey) && event.key === key) {
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
