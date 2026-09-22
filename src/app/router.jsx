import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClientePage from "../features/cliente/page/ClientePage";
import Home from "../features/home/page/Home";

export default function Router() {

  return (

       <BrowserRouter>

           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/cliente" element={<ClientePage />} />
           </Routes>

      </BrowserRouter>

  );
}

