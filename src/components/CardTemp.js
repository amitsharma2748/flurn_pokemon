import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { deleteContact } from "../Redux/slice";
const CardTemp = (props) => {
  const { url, name, attack, defence } = props;
  const location = useLocation();
  const currentLocation = location.pathname;
  const dispatch = useDispatch();
  // console.log(props);
  const deletehandler = () => {
    dispatch(deleteContact(props?.id));
  };
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={url}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            sx={{ textTransform: "capitalize" }}
            gutterBottom
            variant="h3"
            component="div"
          >
            {name}
          </Typography>
        </CardContent>
        <CardContent className="flex justify-evenly">
          <Typography
            sx={{ textTransform: "capitalize" }}
            gutterBottom
            variant="h5"
            component="div"
            className="text-green-700"
          >
            DEF :
          </Typography>
          <Typography
            sx={{ textTransform: "capitalize" }}
            gutterBottom
            variant="h5"
            component="div"
            className="text-green-700"
          >
            {defence}
          </Typography>
        </CardContent>
        <CardContent className="flex justify-evenly">
          <Typography
            sx={{ textTransform: "capitalize" }}
            gutterBottom
            variant="h5"
            component="div"
            className="text-red-700"
          >
            ATT :
          </Typography>
          <Typography
            sx={{ textTransform: "capitalize" }}
            gutterBottom
            variant="h5"
            component="div"
            className="text-red-700"
          >
            {attack}
          </Typography>
        </CardContent>
        <CardContent className="flex justify-evenly">
          {" "}
          {currentLocation === "/bookmark" ? (
            <Button variant="contained" color="error" onClick={deletehandler}>
              Remove from Bookmark
            </Button>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardTemp;
