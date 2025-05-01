import { useEffect, useState } from "react";

function ApiPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch("https://invalid-url.com/data")
        .then((res) => {
          if (!res.ok) throw new Error("서버 응답 오류");
          return res.json();
        })
        .then(setData)
        .catch((err) => setError(err)); // 직접 throw X
    }, []);
  
    if (error) throw error; // 렌더링 중 throw로 ErrorBoundary가 잡음
  
    return <div>{data ? data.title : "로딩 중..."}</div>;
}

export default ApiPage;