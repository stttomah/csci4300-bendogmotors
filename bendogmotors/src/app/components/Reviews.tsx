import React from 'react';
import styles from './Reviews.module.css';
import ReviewCard from './ReviewCard';

const Reviews = () => (
    <div className={styles.reviewsContainer}>
      <ReviewCard 
        name="Elena Reyes" 
        date="6/28/2012" 
        comment="I LOVE BENDOG MOTORS!!! Best place to purchase and sell cars!" 
      />
      <ReviewCard 
        name="Elenor Reyes" 
        date="12/13/2024" 
        comment="I love shopping at Bendog's! My mom also shopped here before!" 
      />
    </div>
  );

export default Reviews;
