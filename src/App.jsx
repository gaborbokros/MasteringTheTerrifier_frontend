import { NavLink, Outlet } from "react-router";
import './app.css'

function App() {
  return (
    <>
      <Outlet />
      <footer>
        <NavLink to="/" end>Kezdőlap</NavLink>
        <NavLink to="/adatvedelmi-tajekoztato" end>Adatvédelmi szabályzat</NavLink>
        <NavLink to="/versenyszabalyzat" end>Verseny szabályzat</NavLink>
        <NavLink to="/jelentkezes" end>Jelentkezés</NavLink>
      </footer>
    </>
  )
}

export default App
