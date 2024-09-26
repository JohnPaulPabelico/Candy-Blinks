import React, { useEffect, useState } from "react";

export default function useRendered() {
  const [rendered, setrendered] = useState(false);

  useEffect(() => {
    setrendered(true);
  }, []);

  return rendered;
}
