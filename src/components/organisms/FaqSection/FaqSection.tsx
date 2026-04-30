'use client';

import React, { useState } from 'react';
import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { AccordionItem } from '@/components/molecules/AccordionItem/AccordionItem';
import { styles } from '@/styles/design-system';
import { Link } from '@/components/atoms';
import { ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface Cta {
  text: string;
  href: string;
}

interface FaqSectionProps {
  title: string;
  questions: FaqItem[];
  cta?: Cta;
  id?: string;
}

export function FaqSection({ title, questions, cta, id }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className={styles.page.section}>
      <Container className={styles.faq.container}>
        <Text as="h2" className={styles.faq.title}>
          {title}
        </Text>
        <Container className={styles.faq.list}>
          {questions.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </Container>
        {cta && (
          <Container className={styles.faq.ctaContainer}>
            <Link href={cta.href} className={styles.faq.ctaButton}>
              {cta.text}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </Container>
        )}
      </Container>
    </section>
  );
}
