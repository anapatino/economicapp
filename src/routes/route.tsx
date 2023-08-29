import {App} from "../App";
import Dashboard from "../pages/dashboard";
import { InterestSimple } from "../pages/interst/InterestSimple";
import { InterestCompound } from "../pages/interst/interestCompound";
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
              path: "interest-simple/",
              element: <InterestSimple />,
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
