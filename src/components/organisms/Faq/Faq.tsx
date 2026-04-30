'use client';

import { FC, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { Section } from '@/components/templates/Section';
import { AccordionItem } from '@/components/molecules/AccordionItem';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';

export const Faq: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    {
      question: 'Is Flycure a hospital?',
      answer:
        'No, Flycure is an independent care coordination platform built by doctors to ensure ethical and transparent medical travel. We partner with accredited hospitals.',
    },
    {
      question: 'How much does the assistance cost me?',
      answer:
        'Our end-to-end assistance is free for patients. Our revenue is generated directly from hospitals, not commissions on your bill, maintaining trust and clinical focus.',
    },
    {
      question: 'What if my plans change?',
      answer:
        'We provide clear, legal cancellation and refund policies upfront. Your care manager will guide you through any changes to your treatment or travel schedule.',
    },
  ];

  return (
    <Section id="faq" title="Your Questions, Answered.">
      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((item, index) => (
          <AccordionItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <Button asChild variant="ghost" size="lg">
          <Link href="/faq">
            View all FAQs <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </Section>
  );
};
