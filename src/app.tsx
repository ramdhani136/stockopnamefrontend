import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
