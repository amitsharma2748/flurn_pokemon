import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex w-1/2 m-auto xs:flex-col lg:flex-row  justify-between mt-10 ">
        <div>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/search")}
          >
            Search
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => navigate("/list")}
          >
            Listings
          </Button>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/bookmark")}
          >
            Bookmarks
          </Button>
        </div>
      </div>

      <div className="mt-12">{props.children}</div>
    </div>
  );
};

export default Home;
