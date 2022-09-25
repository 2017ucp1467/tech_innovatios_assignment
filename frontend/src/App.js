import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/bus-tickets' element={<BookingPage />} />
          <Route
            path='/bus-tickets/booking-confirmation'
            element={<ConfirmationPage />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
