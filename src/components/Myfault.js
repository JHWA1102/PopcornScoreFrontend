import React from "react";

function Myfault() {
    if (true) {
        throw new Error("랜더링 에러 테스트!");
    }
    return <span>이건 안 보임!</span>
}

export default Myfault;