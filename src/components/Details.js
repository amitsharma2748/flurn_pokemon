import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { addContact } from "../Redux/slice";
import { useDispatch, useSelector } from "react-redux";
const Details = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const name = location.pathname.split(":")[1];
  const details = useSelector((state) => state.tasks.tasks);
  useEffect(() => {
    console.log("details");
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => setData(res?.data));
  }, []);
  const addBookmark = () => {
    dispatch(addContact(data));
  };
  // console.log(data);
  return (
    <Box width={"100%"}>
      <Container
        maxWidth={"lg"}
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

          margin: "auto",
          marginTop: "120px",
        }}
      >
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} textAlign={"center"}>
              <Typography
                variant="h4"
                textTransform={"capitalize"}
                padding={"10px"}
              >
                {data?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display={"flex"} justifyContent={"center"}>
                <img
                  src={data?.sprites?.other["official-artwork"].front_default}
                  alt="image"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid
                container
                spacing={3}
                display={"flex"}
                alignItems={"center"}
              >
                <Grid item xs={5}>
                  <Typography variant="h5" className="text-orange-700">
                    Abilities
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  {data?.abilities?.map((item) => (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ margin: "5px" }}
                    >
                      {item.ability.name}
                    </Button>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  <Grid container display={"flex"} alignItems={"center"}>
                    <Grid item xs={10}>
                      <Typography variant="h6">XP</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <p className="text-green-600">{data?.base_experience}</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container display={"flex"} alignItems={"center"}>
                    <Grid item xs={10}>
                      <Typography variant="h6">Weight</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <p className="text-green-600">{data?.weight} </p>
                    </Grid>
                  </Grid>
                </Grid>
                {data?.stats?.map((item) => (
                  <Grid item xs={6}>
                    <Grid container display={"flex"} alignItems={"center"}>
                      <Grid item xs={10}>
                        <Typography variant="h6" textTransform={"capitalize"}>
                          {item?.stat?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <p className="text-green-600">{item?.base_stat} </p>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} textAlign={"center"} marginTop={"55px"}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={addBookmark}
                  disabled={details
                    ?.map((item) => item.name)
                    .includes(data?.name)}
                  endIcon={
                    details?.map((item) => item.name).includes(data?.name) ? (
                      <BookmarksIcon className="hover:cursor-pointer text-white" />
                    ) : (
                      <BookmarkBorderIcon className="hover:cursor-pointer text-white" />
                    )
                  }
                >
                  Bookmark
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Details;
