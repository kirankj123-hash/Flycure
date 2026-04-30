'use client';

import React, { useState } from 'react';
import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';

const { title, testimonials } = content.mainLandingPage.testimonialSlider;

export function TestimonialSlider() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<section className={styles.testimonialSlider.container}>
			<Text as="h2" className={styles.testimonialSlider.title}>
				{title}
			</Text>
			<Container className={styles.testimonialSlider.content}>
				<Text className={styles.testimonialSlider.quote}>
					&ldquo;{testimonials[currentIndex].quote}&rdquo;
				</Text>
				<Container className={styles.testimonialSlider.authorContainer}>
					<Text as="p" className={styles.testimonialSlider.author}>{testimonials[currentIndex].author}</Text>
					<Text as="p" className={styles.testimonialSlider.location}>{testimonials[currentIndex].location}</Text>
				</Container>
			</Container>

			<Container className={styles.testimonialSlider.navigation}>
				<Button onClick={handlePrev} className={styles.testimonialSlider.navButton} aria-label="Previous testimonial">
					<Icon className={styles.testimonialSlider.navIcon}>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</Icon>
				</Button>
				<Button onClick={handleNext} className={styles.testimonialSlider.navButton} aria-label="Next testimonial">
					<Icon className={styles.testimonialSlider.navIcon}>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</Icon>
				</Button>
			</Container>
		</section>
	);
}
