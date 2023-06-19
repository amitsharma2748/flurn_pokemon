import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex w-1/2 m-auto sm:flex-row flex-col  justify-between mt-10 ">
        <div className="mt-5 flex justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/search")}
          >
            Search
          </Button>
        </div>
        <div className="mt-5 flex justify-center">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => navigate("/list")}
          >
            Listings
          </Button>
        </div>

        <div className="mt-5 flex justify-center">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/bookmark")}
          >
            Favourite
          </Button>
        </div>
      </div>

      <div className="sm:mt-2 mt-12 ">{props.children}</div>
    </div>
  );
};

export default Home;
