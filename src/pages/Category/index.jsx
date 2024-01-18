import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../../domain/api";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import TableCustom from "../../components/TableCustom";

const head = ["Provider", "Email", "Category"];

const Category = () => {
  const { name } = useParams();
  const [datas, setDatas] = useState([]);

  console.log(name);

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
      <TableCustom head={head} data={datas} />
    </Box>
  );
};

export default Category;
