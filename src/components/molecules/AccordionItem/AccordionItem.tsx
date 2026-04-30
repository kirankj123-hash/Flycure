'use client';

import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { styles } from '@/styles/design-system';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  return (
    <Container className={styles.faq.item}>
      <button
        className={styles.faq.trigger}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <Text as="span" className={styles.faq.questionText}>
          {question}
        </Text>
        <svg
          className={styles.faq.icon + (isOpen ? ' rotate-180' : '')}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <Container className={styles.faq.content}>
          <Text className={styles.faq.answerText}>{answer}</Text>
        </Container>
      )}
    </Container>
  );
}
