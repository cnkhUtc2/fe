import React from "react";
import Slider from "./sliderHome";
import Panel from "./Panel";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Blog from "./Blog";
import ImgMediaCard from "./ImgCard";
import styles from "../styles/Home.module.css";
import DonatePanel from "./donate/DonatePanel";

const Home = () => {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        display: "flex",
      }}
    >
      {/* Thêm Panel */}
      <Panel
        title="Grow a seed"
        content="Change a life
                        Transform a nation"
        buttonText="Join with us"
        onButtonClick={() => alert("Chuyển đến trang cập nhật!")}
        imageSrc="src/assets/volunteers-wp-photo.jpeg"
      />
      <h1 className={styles.title}>Our model</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ImgMediaCard
              image="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Community Support"
              description="Join our community of volunteers and make a difference in people's lives through direct support and assistance."
            />
          </Grid>
          <Grid item xs={4}>
            <ImgMediaCard
              image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Education Initiative"
              description="Providing books and supplies to underprivileged schools to help children access quality education."
            />
          </Grid>
          <Grid item xs={4}>
            <ImgMediaCard
              image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Healthcare Access"
              description="Ensuring communities have access to essential healthcare services and medical supplies."
            />
          </Grid>
        </Grid>
      </Box>
      <Slider />
      <h1 className={styles.title}>Blogs</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Blog />
          </Grid>
          <Grid item xs={4}>
            <Blog />
          </Grid>
          <Grid item xs={4}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
      <DonatePanel />
    </div>
  );
};

export default Home;
