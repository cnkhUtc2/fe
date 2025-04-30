import React, { useState } from "react";
import styles from "../../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { signin } from "../../apis/services/AuthService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signin({ email, password });
      localStorage.setItem("token", response.data?.accessToken);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
      console.error("Sign in fail", err);
    }
  };

  return (
    <Container maxWidth="xs">
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

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
          <Typography
            variant="body2"
            color="primary"
            style={{ cursor: "pointer" }}
          >
            Forgot password?
          </Typography>
        </Box>

        <Button variant="contained" color="primary" fullWidth type="submit">
          LOGIN
        </Button>

        <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
          <Button
            variant="contained"
            color="error"
            className={styles["google-button"]}
            startIcon={<Google />}
          >
            Google
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={styles["facebook-button"]}
            startIcon={<Facebook />}
          >
            Facebook
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Don't have account ?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
