import {App} from "../App";
import Dashboard from "../pages/dashboard";
import { InterestSimple } from "../pages/interst/InterestSimple";
import { InterestSimpleMf } from "../pages/interst/interestSimpleMf";
import { InterestSimpleCapital } from "../pages/interst/interestSimpleCapital";
import { InterestSimpleTasaInteres } from "../pages/interst/interestSimpleTasaInteres";
import { InterestSimpleTiempoInvertido } from "../pages/interst/interestSimpleTiempoInvertido";

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
              path: "interest-simple/monto-final/",
              element: <InterestSimpleMf />,
            },
            {
              path: "interest-simple/capital/",
              element: <InterestSimpleCapital />,
            },
            {
              path: "interest-simple/tasa-de-interes/",
              element: <InterestSimpleTasaInteres />,
            },
            {
              path: "interest-simple/tiempo-invertido/",
              element: <InterestSimpleTiempoInvertido />,
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
