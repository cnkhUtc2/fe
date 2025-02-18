import React from 'react';
import Slider from './sliderHome';
import Panel from './panel';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Blog from './Blog';
import ImgMediaCard from './ImgCard';
import styles from '../../styles/Home.module.css';
import DonatePanel from './DonatePanel';


const Home = () => {
    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', display: 'flex' }}>
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
                        <ImgMediaCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ImgMediaCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ImgMediaCard />
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
    )
};

export default Home;
