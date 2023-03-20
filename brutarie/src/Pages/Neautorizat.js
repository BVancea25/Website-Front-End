import React from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const Neautorizat = () => {
  const refresh = useRefreshToken();

  return (
    <div>
      <h1>Neautorizat</h1>
      <button onClick={() => refresh()}>Refresh</button>
    </div>
  );
};

export default Neautorizat;
