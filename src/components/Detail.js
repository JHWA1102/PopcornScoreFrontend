import { React, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Detail() {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location);
    console.log(navigate);

    useEffect(() => {
        if (location.state === undefined) {
            navigate("/");
        }
      }, [location, navigate]); 

    if(location.state) {
        return <span>{location.state.title}</span>
    } else {
        return null;
    }
  }


export default Detail;