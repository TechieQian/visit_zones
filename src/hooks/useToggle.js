import { useState } from "react";

export default function useToggle(initialState) {
  const [open, setOpen] = useState(initialState);

  function setToggle() {
    setOpen(!open);
  }
  return [open, setToggle];
}
