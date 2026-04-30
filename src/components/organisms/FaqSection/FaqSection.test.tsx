import { render, screen, fireEvent } from '@/test-utils';
import { FaqSection } from './FaqSection';

describe('FaqSection', () => {
  it('renders the main title', () => {
    render(<FaqSection />);
    expect(screen.getByRole('heading', { name: 'Your Questions, Answered.' })).toBeInTheDocument();
  });

  it('renders all questions', () => {
    render(<FaqSection />);
    expect(screen.getByText(/How does the 'Pay Hospitals Directly' model work?/i)).toBeInTheDocument();
    expect(screen.getByText(/Are the quoted prices all-inclusive?/i)).toBeInTheDocument();
    expect(screen.getByText(/What happens if there is a complication during treatment?/i)).toBeInTheDocument();
  });

  it('shows the first answer by default', () => {
    render(<FaqSection />);
    expect(screen.getByText(/Flycure only facilitates the connection and documentation./i)).toBeInTheDocument();
  });

  it('hides other answers by default', () => {
    render(<FaqSection />);
    expect(screen.queryByText(/Yes, our quotes are all-inclusive/i)).not.toBeInTheDocument();
  });

  it('opens a closed item on click', () => {
    render(<FaqSection />);
    const secondQuestion = screen.getByText(/Are the quoted prices all-inclusive?/i);
    fireEvent.click(secondQuestion);
    expect(screen.getByText(/Yes, our quotes are all-inclusive/i)).toBeInTheDocument();
  });

  it('closes an open item when it is clicked again', () => {
    render(<FaqSection />);
    const firstQuestion = screen.getByText(/How does the 'Pay Hospitals Directly' model work?/i);
    expect(screen.getByText(/Flycure only facilitates the connection and documentation./i)).toBeInTheDocument();
    fireEvent.click(firstQuestion);
    expect(screen.queryByText(/Flycure only facilitates the connection and documentation./i)).not.toBeInTheDocument();
  });
});
