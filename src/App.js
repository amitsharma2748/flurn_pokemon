import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home.js";
import Search from "./components/Search.js";
import Listings from "./components/Listings.js";
import Details from "./components/Details.js";
import { HashRouter } from "react-router-dom";
import Bookmark from "./components/Bookmark";
import Landing from "./components/Landing";
function App() {
  return (
    <HashRouter>
      <Home>
        {" "}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/list" element={<Listings />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </Home>
    </HashRouter>
  );
}

export default App;
