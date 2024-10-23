import React, { useState } from "react"; // You can keep useState if needed later
import LogInSignup from "./Components/LogInSignup"; // Import the LogInSignup component
import DisplayCard from "./Components/DisplayCard"; // Import the DisplayCard component

function App() {
  return (
    <div>
      <DisplayCard /> {/* Render the DisplayCard component */}
    </div>
  );
}

export default App;
