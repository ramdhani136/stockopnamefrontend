import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LoginPage, HomePage, SchedulePage } from "./pages";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
