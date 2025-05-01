import React from "react";

// Common error case in React (5 cases)

// 1. During Rendering : access to undefined.title 
export function FallbackRenderingError({ error, resetErrorBoundary }) {
    return (
        <div>
            <h2>화면을 표시하는데 문제가 발생했습니다.</h2>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary} style={{width: "20%", height: "20%"}}>다시 시도</button>
        </div>
    )
}

// 2. Asynchronous Error(API, fetch etc.) : server error, network error
export function FallbackApiError({ resetErrorBoundary}) {
    return (
        <div>
            <h2>데이터를 불러오지 못했습니다.</h2>
            <p>인터넷 연결을 확인하거나 잠시 후 다시 시도해 주세요.</p>
            <button onClick={resetErrorBoundary} style={{width: "20%", height: "20%"}}>재시도</button>
        </div>
    )
}

// 3. Routing Error (non-existent routing) : /404-not-found
export function FallbackNotFound() {
    return (
        <div>
            <h2>페이지를 찾을 수 없습니다.</h2>
            <p>입력한 주소가 올바른지 확인해주세요.</p>
        </div>
    )
}

// 4. Component loading failure : Bundle loading failure, import error

// 5. User error : Missing/Wrong data