import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QCmcSLgrtP6kElcRqCS0EgEpJV6avIUGdMIQTrxUskgfEtUjfT4DdsWffpPJQRZQEeclWb5xawZo1KpEAYmyGXl005ww3Q6Tb"
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
