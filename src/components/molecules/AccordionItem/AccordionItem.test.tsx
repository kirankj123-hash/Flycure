import { render, screen, fireEvent } from '@/test-utils';
import { AccordionItem } from './AccordionItem';
import { ChevronDown } from 'lucide-react';

describe('AccordionItem', () => {
  const defaultProps = {
    title: 'Is this a test?',
    icon: ChevronDown,
    content: <div>Yes, this is a test answer.</div>,
  };

  it('renders the title', () => {
    render(<AccordionItem {...defaultProps} />);
    expect(screen.getByText('Is this a test?')).toBeInTheDocument();
  });

  it('does not render the content when closed', () => {
    render(<AccordionItem {...defaultProps} />);
    expect(screen.queryByText('Yes, this is a test answer.')).not.toBeInTheDocument();
  });

  it('renders the content when open', () => {
    render(<AccordionItem {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Yes, this is a test answer.')).toBeInTheDocument();
  });

  it('toggles content visibility when clicked', () => {
    render(<AccordionItem {...defaultProps} />);
    const button = screen.getByRole('button');

    // Initially closed
    expect(screen.queryByText('Yes, this is a test answer.')).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(button);
    expect(screen.getByText('Yes, this is a test answer.')).toBeInTheDocument();

    // Click to close
    fireEvent.click(button);
    expect(screen.queryByText('Yes, this is a test answer.')).not.toBeInTheDocument();
  });
});
