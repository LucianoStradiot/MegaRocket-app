import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './indexMember.module.css';
import Aside from 'Components/Shared/Aside';

const MemberUser = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const title = ['Welcome', 'About', 'Join us'];
  const text = [
    'Mega Rocket web is a monthly management system for members and trainers so that they can dynamically sign up for their activities in the gym.',
    'Since 1965, no gym has been responsible for more life-changing transformations and fitness achievements than Mega Rocket.',
    'Join our gym, unleash your potential! Get expert guidance, state-of-the-art facilities, and a supportive community. Take the first step towards a healthier you. Join now!'
  ];

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.supremeContainer}>
      <Aside page={'home'} />
      <div className={styles.mainContainer}>
        <main data-testid="home-page">
          <section className={styles.card}>
            <article>
              <h1>MEGA ROCKET</h1>
              <div className={styles.carouselContent}>
                <Carousel
                  selectedItem={currentSlide}
                  onChange={handleSlideChange}
                  showThumbs={false}
                  showStatus={false}
                  className={styles.carousel}
                  autoPlay={true}
                  interval={6000}
                  infiniteLoop={true}
                >
                  {title.map((slideTitle, index) => (
                    <div key={index}>
                      <h2>{slideTitle}</h2>
                      <p>{text[index]}</p>
                    </div>
                  ))}
                </Carousel>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MemberUser;
