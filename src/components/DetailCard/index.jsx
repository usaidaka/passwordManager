import React from "react";
import classes from "./style.module.scss";

const DetailCard = ({ user }) => {
  return (
    <table className={classes["list-wrapper"]}>
      <tr>
        <td>id</td>
        <td>: {user.id}</td>
      </tr>
      <tr>
        <td>provider</td>
        <td>: {user.provider}</td>
      </tr>
      <tr>
        <td>email</td>
        <td>: {user.email}</td>
      </tr>
      <tr>
        <td>password</td>
        <td>: {user.password}</td>
      </tr>
      <tr>
        <td>category</td>
        <td>: {user.category}</td>
      </tr>
    </table>
  );
};

export default DetailCard;
