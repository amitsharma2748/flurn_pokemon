import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { InsertEmoticon } from "@mui/icons-material";
import Loader from "../loader/Loader";
const Search = () => {
  const [name, setName] = useState();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchHandler = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Enter valid name");
        setShow(false);
      });
  };
  return (
    <>
      <div>
        <div className="m-auto text-center">
          <TextField
            type="text"
            onChange={(e) => {
              setName(e.target.value);
              setShow(true);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    className="hover:cursor-pointer"
                    onClick={searchHandler}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {show &&
          (loading ? (
            <Loader />
          ) : (
            <div className="text-center mt-4">
              <Card sx={{ maxWidth: 345, margin: "auto" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      data?.sprites.other["official-artwork"].front_default
                    }
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      sx={{ textTransform: "capitalize" }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {data?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data?.weight} KG
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};

export default Search;
