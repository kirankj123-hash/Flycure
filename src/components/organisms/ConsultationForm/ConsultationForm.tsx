'use client';

import React from 'react';
import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input/Input';
import { Select, Option } from '@/components/atoms/Select/Select';
import { styles } from '@/styles/design-system';
import content from '@/content/en.json';
import { MessageSquare } from 'lucide-react';

export function ConsultationForm() {
  const { inquiry } = content.mainLandingPage;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="inquiry" className="bg-surface py-16 md:py-24 px-4">
      <Container className="max-w-2xl mx-auto">
        <div className="p-8 md:p-12 bg-white rounded-3xl shadow-xl text-center space-y-6">
          <Text as="h2" className="text-3xl md:text-4xl font-bold text-text-primary">
            {inquiry.title}
          </Text>
          <Text className="text-lg text-text-secondary">
            {inquiry.subtitle}
          </Text>

          <form className="space-y-5 text-left" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="inquiry-name" className="text-sm font-medium text-text-primary">
                {inquiry.fields.name.label}
              </label>
              <Input
                id="inquiry-name"
                name="name"
                type="text"
                placeholder={inquiry.fields.name.placeholder}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="inquiry-email" className="text-sm font-medium text-text-primary">
                {inquiry.fields.email.label}
              </label>
              <Input
                id="inquiry-email"
                name="email"
                type="email"
                placeholder={inquiry.fields.email.placeholder}
                required
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <label htmlFor="inquiry-phone" className="text-sm font-medium text-text-primary">
                  {inquiry.fields.phone.label}
                </label>
                <Input
                  id="inquiry-phone"
                  name="phone"
                  type="tel"
                  placeholder={inquiry.fields.phone.placeholder}
                  required
                />
              </div>
              <div className="sm:w-1/3 space-y-2">
                <label htmlFor="inquiry-diagnosis" className="text-sm font-medium text-text-primary">
                  {inquiry.fields.diagnosis.label}
                </label>
                <Select
                  id="inquiry-diagnosis"
                  name="diagnosis"
                  className={styles.form.input}
                  defaultValue=""
                  required
                >
                  <Option value="" disabled>
                    {inquiry.fields.diagnosis.placeholder}
                  </Option>
                  {inquiry.fields.diagnosis.options.map((option: string) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="w-full text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl"
            >
              {inquiry.primaryCta}
            </Button>

            <a
              href={inquiry.secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-medium text-text-secondary border border-transparent rounded-full py-2 hover:text-fly-blue"
            >
              <MessageSquare className="w-4 h-4" aria-hidden />
              {inquiry.secondaryCta.text}
            </a>
          </form>
        </div>
      </Container>
    </section>
  );
}
