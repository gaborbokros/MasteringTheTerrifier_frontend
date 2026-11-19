import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx'
import Home from "./home/Home.jsx"
import Jelentkezes from "./jelentkezes/Jelentkezes.jsx"
import Adatvedelmi from "./adatvedelmi/Adatvedelmi.jsx"
import Versenyszabalyzat from "./versenyszabalyzat/Versenyszabalyzat.jsx"
import Edit from "./edit/Edit.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="/adatvedelmi-tajekoztato" element={<Adatvedelmi />} />
        <Route path="/versenyszabalyzat" element={<Versenyszabalyzat />} />
        <Route path="/jelentkezes" element={<Jelentkezes />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
