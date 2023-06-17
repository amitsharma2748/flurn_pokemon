import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home.js";
import Search from "./components/Search.js";
import Listings from "./components/Listings.js";
import Details from "./components/Details.js";
import { BrowserRouter } from "react-router-dom";
import Bookmark from "./components/Bookmark";
function App() {
  return (
    <BrowserRouter>
      <Home>
        {" "}
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/list" element={<Listings />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </Home>
    </BrowserRouter>
  );
}

export default App;
