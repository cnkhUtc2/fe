import viteLogo from '/vite.svg';  // Đảm bảo đường dẫn tới file hình ảnh là đúng
import reactLogo from './assets/react.svg';
import React, { useState } from 'react';  // Thêm useState vào đây
import Home from './components/Home/home';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import './App.css';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    </>
  );
}

export default App;
