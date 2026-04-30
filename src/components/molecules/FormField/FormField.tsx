import React from 'react';
import { Container } from '@/components/atoms/Container/Container';
import { Text } from '@/components/atoms/Text/Text';
import { Input, InputProps } from '@/components/atoms/Input/Input';
import { styles } from '@/styles/design-system';

interface FormFieldProps extends InputProps {
  label: string;
  name: string;
}

export function FormField({ label, name, ...props }: FormFieldProps) {
  return (
    <Container className={styles.form.field}>
      <Text as="label" htmlFor={name} className={styles.form.label}>
        {label}
      </Text>
      <Input name={name} id={name} {...props} />
    </Container>
  );
}
