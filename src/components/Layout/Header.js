import React from "react";
import Logo from "../../assets/images/popcornscore-logo-white.png"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner_contents}>
        {/* 왼쪽 로고 */}
        <img className={styles.logo}
          src={Logo}
          alt="Popcorn Score Logo"
        />
        {/* 오른쪽 input */}

        <div className={styles.search}>
            <input type="text" 
              placeholder="영화 제목을 입력하세요">
            </input>
        </div>
      </div>
    </header>
  );
};

export default Header;