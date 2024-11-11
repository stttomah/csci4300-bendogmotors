import React from 'react';
import styles from './Reviews.module.css';
import ReviewCard from './ReviewCard';

const Reviews = () => (
    <div className={styles.reviewsContainer}>
        <h2 className={styles.reviewsHeading}>Over 1000 5-Star Reviews!</h2>
        <ReviewCard 
            name="Elena Reyes" 
            date="6/28/2012" 
            comment="I LOVE BENDOG MOTORS!!!" 
            subcomment="Best place to purchase and sell cars!"
            image="/images/elena.png"
        />
        <ReviewCard 
            name="Elenor Reyes" 
            date="12/13/2024" 
            comment="I love shopping at Bendog's!" 
            subcomment="My mom also shopped here before!" 
            image="images/elanor.png"
        />
    </div>
);

export default Reviews;
