import React from 'react';
import Slider from './sliderHome';
import RecipeReviewCard from './ImgCard';

const Home = () => {
    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', display: 'flex' }}>
            <h1>Home</h1>
            <RecipeReviewCard />
            <Slider />
        </div>
    )
};

export default Home;
