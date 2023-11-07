import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function closeDetail(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", closeDetail);

      return function () {
        document.removeEventListener("keydown", closeDetail);
        console.log("close");
      };
    },
    [action, key]
  );
}
