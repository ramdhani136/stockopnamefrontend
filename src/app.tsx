import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LayoutComponent } from "./components/organisme";
import {
  LoginPage,
  HomePage,
  SchedulePage,
  NotFoundPage,
  FormSchedulePage,
  ScheduleItemPage,
} from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LayoutComponent Child={HomePage} />} />
        <Route
          path="/schedule"
          element={<LayoutComponent Child={SchedulePage} />}
        />
        <Route
          path="/schedule/:id"
          element={<LayoutComponent Child={FormSchedulePage} />}
        />
        <Route
          path={`/schedule/:scheduleId/:scheduleItem`}
          element={<LayoutComponent Child={ScheduleItemPage} />}
        />
        <Route
          path="/schedule/new"
          element={<LayoutComponent Child={FormSchedulePage} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
