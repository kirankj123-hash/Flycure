import { render, screen, fireEvent } from '@/test-utils';
import { TestimonialSlider } from './TestimonialSlider';

describe('TestimonialSlider', () => {
  it('renders the first testimonial by default', () => {
    render(<TestimonialSlider />);
    expect(screen.getByText(/"The transparent pricing was what sold me/)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
  });

  it('navigates to the next testimonial when the next button is clicked', () => {
    render(<TestimonialSlider />);
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);

    expect(screen.getByText(/"From the initial consultation to post-surgery follow-up/)).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('UK')).toBeInTheDocument();
  });

  it('navigates to the previous testimonial when the previous button is clicked', () => {
    render(<TestimonialSlider />);
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton); // Go to the second slide

    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton); // Go back to the first slide

    expect(screen.getByText(/"The transparent pricing was what sold me/)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('loops from the last testimonial to the first when next is clicked', () => {
    render(<TestimonialSlider />);
    const nextButton = screen.getByLabelText('Next testimonial');
    
    // Click next to go through all testimonials
    fireEvent.click(nextButton); // to slide 2
    fireEvent.click(nextButton); // to slide 3
    fireEvent.click(nextButton); // should loop to slide 1

    expect(screen.getByText(/"The transparent pricing was what sold me/)).toBeInTheDocument();
  });

  it('loops from the first testimonial to the last when previous is clicked', () => {
    render(<TestimonialSlider />);
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton); // should loop to the last slide

    expect(screen.getByText(/"I was nervous about traveling for surgery/)).toBeInTheDocument();
    expect(screen.getByText('Carlos Garcia')).toBeInTheDocument();
  });
});
