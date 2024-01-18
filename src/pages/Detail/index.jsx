import React, { useEffect, useState } from "react";
import { callApi } from "../../domain/api";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import classes from "./style.module.scss";
import DetailCard from "../../components/DetailCard";

const Detail = () => {
  const [user, setUser] = useState({});
  const [head, setHead] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetchDetailUser();
  }, [id]);

  const fetchDetailUser = async () => {
    try {
      const response = await callApi(`/password/${id}`, "GET");
      setUser(response);
      setHead(Object.keys(response));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to={-1}>
        <Button className={classes.back} variant="outlined">
          Back
        </Button>
      </Link>
      <Box>
        <DetailCard user={user} />
      </Box>
    </>
  );
};

export default Detail;
