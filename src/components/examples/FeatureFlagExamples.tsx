/**
 * Feature Flag Examples
 * Demonstrates how to use feature flags in components
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useFeature, useFeatures } from '@/lib/features/hooks';
import { Button } from '@/components/atoms/Button/Button';

/**
 * Example 1: Simple feature toggle
 */
export function BookingButton() {
  const canBook = useFeature('booking');

  if (!canBook) {
    return (
      <Button variant="secondary" disabled>
        Booking Coming Soon
      </Button>
    );
  }

  return (
    <Button variant="default">
      Book Appointment
    </Button>
  );
}

/**
 * Example 2: Feature with fallback content
 */
export function ChatWidget() {
  const hasChat = useFeature('chat');

  if (!hasChat) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          Chat support coming soon! Contact us via email in the meantime.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700">
        💬 Chat with us
      </button>
    </div>
  );
}

/**
 * Example 3: Multiple features check
 */
export function AdvancedFeatures() {
  const features = useFeatures([
    'price_comparison',
    'reviews',
    'recommendations',
  ]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available Features</h3>
      
      {features.price_comparison && (
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium">Price Comparison</h4>
          <p className="text-sm text-gray-600">
            Compare treatment prices across hospitals
          </p>
        </div>
      )}

      {features.reviews && (
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium">Patient Reviews</h4>
          <p className="text-sm text-gray-600">
            Read reviews from verified patients
          </p>
        </div>
      )}

      {features.recommendations && (
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium">AI Recommendations</h4>
          <p className="text-sm text-gray-600">
            Get personalized treatment suggestions
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Example 4: Feature-gated navigation item
 */
export function NavigationWithFeatures() {
  const hasBooking = useFeature('booking');
  const hasChat = useFeature('chat');

  return (
    <nav className="flex gap-4">
      <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
      <Link href="/departments" className="text-gray-700 hover:text-blue-600">Departments</Link>
      <Link href="/doctors" className="text-gray-700 hover:text-blue-600">Doctors</Link>
      <Link href="/hospitals" className="text-gray-700 hover:text-blue-600">Hospitals</Link>
      
      {hasBooking && (
        <Link href="/dashboard/bookings/new" className="text-blue-600 font-medium">
          Book Now
        </Link>
      )}
      
      {hasChat && (
        <button className="text-blue-600 font-medium">
          Live Chat
        </button>
      )}
    </nav>
  );
}

export default BookingButton;
