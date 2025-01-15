import React from "react";
import Grid from "./components/Grid";

const App = () => {
  return (
    <div className="grrid">
      <h1>Complex Island and Path Formation</h1>
      <Grid rows={15} cols={15} />
    </div>
  );
};

export default App;
