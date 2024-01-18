import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TableCustom from "../../components/TableCustom";
import classes from "./style.module.scss";
import PopUp from "../../components/PopUp";
import { Input } from "@mui/base/Input";
import { callApi } from "../../domain/api";

const head = ["Provider", "Email", "Category"];

const Home = () => {
  const [datas, setDatas] = React.useState();
  const [isOpen, setIsOpen] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      provider: "",
      email: "",
      password: "",
      category: {},
    },
  });

  const onSubmit = async (body) => {
    try {
      const response = await callApi("/password", "POST", {}, {}, body);
      fetchCategory();
      setIsOpen(!isOpen);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await callApi(`/password/${id}`, "DELETE");
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await callApi("/password", "GET");

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
    <Box className={classes["home-container"]}>
      {/* MODAL CREATE ACCOUNT */}
      <Box className={classes["header-container"]}>
        <PopUp title="add">
          <Box>
            <Typography variant="h6">Create Account</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className={classes["form-wrapper"]}>
                <label htmlFor="">website / provider</label>
                <input
                  {...register("provider", {
                    required: true,
                    maxLength: 20,
                  })}
                  type="text"
                  placeholder="input provider"
                />
                {errors?.provider?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.provider?.type === "maxLength" && (
                  <p>provider cannot exceed 20 characters</p>
                )}
              </Box>
              <Box className={classes["form-wrapper"]}>
                <label htmlFor="">email</label>
                <input
                  {...register("email", {
                    required: true,
                    minLength: 5,
                  })}
                  type="email"
                  placeholder="input email"
                />
                {errors?.email?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.email?.type === "minLength" && (
                  <p>password cannot less then 5 characters</p>
                )}
              </Box>
              <Box className={classes["form-wrapper"]}>
                <label htmlFor="">password</label>
                <input
                  type="password"
                  placeholder="input password"
                  {...register("password", {
                    required: true,
                    minLength: 5,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/i,
                  })}
                />
                {errors?.password?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.password?.type === "minLength" && (
                  <p>password cannot less then 5 characters</p>
                )}
                {errors?.password?.type === "pattern" && (
                  <p>password at least contain 1 special character</p>
                )}
              </Box>
              <Box className={classes["form-wrapper"]}>
                <label htmlFor="">category</label>
                <select
                  name=""
                  id=""
                  {...register("category", {
                    required: true,
                  })}
                >
                  <option value="work">work</option>
                  <option value="family">family</option>
                  <option value="personal">personal</option>
                </select>
                {errors?.category?.type === "required" && (
                  <p>This field is required</p>
                )}
              </Box>
              <Box>
                <Button variant="contained" type="submit" color="success">
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </PopUp>
      </Box>
      {/* TABLE DATA */}
      <Box className={classes["content-container"]}>
        <TableCustom head={head} data={datas} action={onDelete} />
      </Box>
    </Box>
  );
};

export default Home;
