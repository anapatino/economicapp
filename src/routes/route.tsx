import {App} from "../App";
import Dashboard from "../pages/dashboard";
import { ComponentInterestSimple } from "../pages/interst/InterestSimple";
import { InterestCompound } from "../pages/interst/interestCompound";
import Home from "../pages/home";
import {
    createBrowserRouter
  } from "react-router-dom";
  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Dashboard />,
          children:[
            {
              path: "",
              element: <Home />,
            },
            {
              path: "interest-simple/",
              element: <ComponentInterestSimple />,
            },
            {
              path: "interest-compound/",
              element: <InterestCompound />,
            },
          ]
        },
      ],
    },
  ]);
