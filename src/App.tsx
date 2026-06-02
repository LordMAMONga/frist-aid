import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./core/router/AppRouter";

function App() {
  return (
    <BrowserRouter basename="import.meta.env.BASE_URL">
      <div style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
        <main
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            backgroundColor: "var(--color-bg)",
            minHeight: "100vh",
            borderLeft: "1px solid var(--color-border)", // Легкая граница слева для ПК-версии
            borderRight: "1px solid var(--color-border)", // Легкая граница справа для ПК-версии
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
