import { App } from "../App";
import Dashboard from "../pages/dashboard";
import { ComponentInterestSimple } from "../pages/interst/InterestSimple";
import { InterestCompound } from "../pages/interst/interestCompound";
import { ComponentGradienteArtmetico } from "../pages/interst/gradienteAritmetico";
import { ComponentGradienteGeometrico } from "../pages/interst/gradienteGeometrico";

import Home from "../pages/home";
import {
  createBrowserRouter
} from "react-router-dom";
import { ComponentTir } from "../pages/tir/tir";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
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
          {
            path: "gradiente-aritmetico/",
            element: <ComponentGradienteArtmetico />,
          },
          {
            path: "gradiente-geometrico/",
            element: <ComponentGradienteGeometrico />,
          },
          {
            path: "tir/",
            element: <ComponentTir />,
          },
        ]
      },
    ],
  },
]);
