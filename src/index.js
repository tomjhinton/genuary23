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
import Cover from './cover/Cover'
import SDF from './sdf/SDF'
import Plant from './plants/Plant'
import Super from './supermatism/Super'
import Tesselation from './tesselation/Tesselation'
import Always from './always/Always'

import Asemic from './asemic/asemic'
import Sine from './sine/Sine'
import Reflection from './reflection/Reflection'
import Grid from './grid/Grid'
import NotGrid from './notGrid/NotGrid'
import BAndW from './bAndW/B&W'
import Deco from './deco/Deco'
import PersianRug from './persianRug/PersianRug'
import Shadows from './shadows/Shadows'
import Moire from './moire/Moire'
import Textile from './textile/Textile'
import Kusama from './kusama/Kusama'
import Kid from './kid/Kid'
import Klint from './klint/Klint'
import Poetry from './poetry/Poetry'
import Maximalism from './maximalism/Maximalism'
import Minimalism from './minimalism/Minimalism'














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
        <Route path="/cover" element={<Cover />} />
        <Route path="/sdf" element={<SDF />} />
        <Route path="/plant" element={<Plant />} />
        <Route path="/super" element={<Super />} />
        <Route path="/tesselation" element={<Tesselation />} />
        <Route path="/always" element={<Always />} />
        <Route path="/asemic" element={<Asemic />} />
        <Route path="/sine" element={<Sine />} />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/notGrid" element={<NotGrid />} />
        <Route path="/bAndW" element={<BAndW />} />
        <Route path="/deco" element={<Deco />} />
        <Route path="/persianRug" element={<PersianRug />} />
        <Route path="/shadows" element={<Shadows />} />
        <Route path="/moire" element={<Moire />} />
        <Route path="/textile" element={<Textile />} />
        <Route path="/kusama" element={<Kusama />} />
        <Route path="/kid" element={<Kid />} />
        <Route path="/klint" element={<Klint />} />
        <Route path="/poetry" element={<Poetry />} />
        <Route path="/maximalism" element={<Maximalism />} />
        <Route path="/minimalism" element={<Minimalism />} />



        </>
     
    )
  );

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
    <h1 className="titular">Genuary 2023</h1>

  <RouterProvider router={router} />
  </>
);