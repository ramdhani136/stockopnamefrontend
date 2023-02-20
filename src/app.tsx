import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LoginPage, HomePage, SchedulePage, NotFoundPage, FormSchedulePage } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedule/:id" element={<FormSchedulePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
