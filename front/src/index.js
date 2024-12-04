// import React from "react";

// import { createRoot } from "react-dom/client";
// import App from "./App";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);
// root.render(<App />);

// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import { BrowserRouter as Router } from "react-router-dom";
// import ReactDOM from "react-dom";

// ReactDOM.render(
//     <Router>
//       <App />
//     </Router>,
//     document.getElementById("root")
//   );

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"; // Kiểm tra nếu bạn chưa dùng Router ở đây

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);

