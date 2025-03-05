import React, { useState } from "react";
import styles from "../../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/front/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data?.data?.accessToken) throw new Error(data.message || "Đăng nhập thất bại")
        else
      {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("user", JSON.stringify({ name: "John Doe" })); // Lấy từ API sau
        navigate("/");
        window.location.reload();
      }

    } catch (err) {
      setError(err.message);
      console.error("Đăng nhập thất bại:", err);
    }
  };

  return (
    <Container maxWidth="xs">

      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <Typography variant="h5" align="center">Đăng nhập</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Mật khẩu"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Box textAlign="right" mb={2}>
          <Typography variant="body2" color="primary" style={{ cursor: "pointer" }}>
            Quên mật khẩu?
          </Typography>
        </Box>

        <Button variant="contained" color="primary" fullWidth type="submit">
          ĐĂNG NHẬP
        </Button>

        <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
          <Button variant="contained" color="error" className={styles["google-button"]} startIcon={<Google />}>
            Google
          </Button>
          <Button variant="contained" color="primary" className={styles["facebook-button"]} startIcon={<Facebook />}>
            Facebook
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2" >
            Chưa có tài khoản? <span style={{ color: "blue", cursor: "pointer" }}     onClick={() => navigate("/register")}>Đăng ký</span>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
