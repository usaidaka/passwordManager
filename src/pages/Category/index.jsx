import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../../domain/api";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import TableCustom from "../../components/TableCustom";
import classes from "./style.module.scss";

const head = ["Provider", "Email", "Category"];

const Category = () => {
  const { name } = useParams();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetchUserByCategory();
  }, [name]);

  const fetchUserByCategory = async () => {
    try {
      const response = await callApi(`/password?category=${name}`, "GET");
      const modifiedData = response.map((item) => {
        const { id, provider, email, category } = item;
        return { id, provider, email, category };
      });
      setDatas(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" color="initial">
        {name.toUpperCase()}
      </Typography>
      <Box className={classes["content-container"]}>
        <TableCustom head={head} data={datas} />
      </Box>
    </Box>
  );
};

export default Category;
