import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./core/router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <main
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "var(--color-bg)",
          minHeight: "100vh",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
