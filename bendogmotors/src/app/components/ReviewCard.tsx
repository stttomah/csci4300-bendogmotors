import React from 'react';
import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  name: string;
  date: string;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, date, comment }) => (
  <div className={styles.reviewCard}>
    <p>{comment}</p>
    <p><strong>{name}</strong></p>
    <p>{date}</p>
  </div>
);

export default ReviewCard;
