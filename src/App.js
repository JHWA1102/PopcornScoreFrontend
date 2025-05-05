import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import axios from "axios";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";

function App() {
  const [hello, setHello] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/test')
         .then((res) => {
          setHello(res.data);
         })
         .catch((err) => {
          setError(err.message);
         })
  }, [])

  // 백엔드 연결
  // <div className="App">
  //   {error ? (
    //     <p style={{ color: 'red' }}>에러 발생: {error}</p>
    //   ) : (
      //     <p>백엔드에서 받은 데이터: {hello}</p>
      //   )}
      // </div>
      
      
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;