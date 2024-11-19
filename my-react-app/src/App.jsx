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
        <div>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Footer />
      </div>
    </>
  );
}

export default App;
