import React from 'react';
import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  name: string;
  date: string;
  comment: string;
  subcomment: string;
  image: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, date, comment, subcomment, image }) => (
  <div className={styles.reviewCard}>
    <p className={styles.rating}>★ ★ ★ ★ ★</p>
    <p className={styles.comment}><strong>{comment}</strong></p>
    <p className={styles.subcomment}>{subcomment}</p>
    <div className={styles.reviewerProfile}>
        <img src={image} alt={`${name}'s profile picture`} className={styles.reviewerImage}/>
        <div>
            <p className={styles.name}><strong>{name}</strong></p>
            <p className={styles.date}>{date}</p>
        </div>
    </div>
  </div>
);

export default ReviewCard;
