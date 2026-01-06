import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/login/Index";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </BrowserRouter>
);

export default App;
