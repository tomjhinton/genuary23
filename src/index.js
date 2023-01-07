import * as React from "react";
import * as ReactDOM from "react-dom";
import './style.css'

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  HashRouter,
  createHashRouter
} from "react-router-dom";

import Home from './Home.js'
import Loop from './loop/Loop.js'
import Ten from './ten/Ten.js'
import Glitch from './glitch/Glitch.js'
import Intersections from './intersections/Intersections'
import Debug from './debug/Debug'
import Steal from './steal/Steal'


const router = createHashRouter(
    createRoutesFromElements(
        <>
      <Route   errorElement={<Home />} />
      <Route path="/" element={<Home />}/>
        <Route path="/loop" element={<Loop />} />
        <Route path="/ten" element={<Ten />} />
        <Route path="/glitch" element={<Glitch />} />
        <Route path="/intersections" element={<Intersections />} />
        <Route path="/debug" element={<Debug />} />
        <Route path="/steal" element={<Steal />} />
        </>
     
    )
  );

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
    <h1 className="title">Genuary-2023</h1>

  <RouterProvider router={router} />
  </>
);