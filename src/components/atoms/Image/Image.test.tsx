import { render, screen } from '@testing-library/react';
import { AtomicImage } from './Image';

describe('AtomicImage', () => {
  it('renders image with correct attributes', () => {
    render(
      <AtomicImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        className="test-class"
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'));
  });

  it('applies custom className', () => {
    render(
      <AtomicImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        className="custom-class"
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveClass('custom-class');
  });

  it('handles priority prop correctly', () => {
    render(
      <AtomicImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        priority
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
  });
});