import React from "react";
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import About from './routes/About';
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import Detail from "./components/Detail";
import MyFault from "./components/Myfault"
import ErrorBoundary from "./components/ErrorBoundary";
import ApiPage from "./components/ApiPage";
import { 
  FallbackRenderingError,
  FallbackApiError,
  FallbackNotFound 
} from "./components/FallbackComponent";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/detail" element={<Detail/>} />
        <Route path="/myFault" element={
          <ErrorBoundary fallback={FallbackRenderingError}>
            <MyFault />
          </ErrorBoundary>}>
        </Route>
        <Route path="/api" element={
          <ErrorBoundary fallback={FallbackApiError}>
            <ApiPage />
          </ErrorBoundary>
        }>
        </Route>
        <Route path="*" element={<FallbackNotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App;