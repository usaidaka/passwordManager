import { useState } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme, Box } from "@mui/material";
import MainFrame from "./components/MainFrame";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Category from "./pages/Category";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/user-detail/:id" element={<Detail />} />
          <Route path="/category/:name" element={<Category />} />
        </Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

function Root() {
  const [myMode, setMyMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: myMode,
      text: {
        secondary: "#969696",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Box>
          <MainFrame />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
