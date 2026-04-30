import { describe, test, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility function', () => {
  test('merges className strings correctly', () => {
    const result = cn('flex', 'items-center', 'justify-between')
    expect(result).toBe('flex items-center justify-between')
  })

  test('handles conditional classes with objects', () => {
    const result = cn('base-class', { 
      'active': true,
      'disabled': false,
      'error': true
    })
    expect(result).toContain('base-class')
    expect(result).toContain('active')
    expect(result).toContain('error')
    expect(result).not.toContain('disabled')
  })

  test('handles arrays of classes', () => {
    const result = cn(['flex', 'items-center'], ['justify-between', 'space-x-2'])
    expect(result).toBe('flex items-center justify-between space-x-2')
  })

  test('merges Tailwind classes correctly with twMerge', () => {
    // twMerge should resolve conflicts by keeping the last class
    const result = cn('px-2 py-1', 'px-4')
    expect(result).toBe('py-1 px-4')
  })

  test('handles mixed input types', () => {
    const result = cn(
      'base-class',
      { 'conditional': true },
      ['array-class'],
      'final-class'
    )
    expect(result).toContain('base-class')
    expect(result).toContain('conditional')
    expect(result).toContain('array-class')
    expect(result).toContain('final-class')
  })

  test('handles undefined and null values gracefully', () => {
    const result = cn('base-class', undefined, null, 'other-class')
    expect(result).toBe('base-class other-class')
  })

  test('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn([])).toBe('')
    expect(cn({})).toBe('')
  })

  test('handles complex Tailwind conflicts', () => {
    const result = cn(
      'bg-red-500 text-white px-2',
      'bg-blue-500 px-4',
      { 'bg-green-500': true }
    )
    // Should resolve to the last bg- and px- classes
    expect(result).toContain('text-white')
    expect(result).toContain('bg-green-500')
    expect(result).toContain('px-4')
    expect(result).not.toContain('bg-red-500')
    expect(result).not.toContain('bg-blue-500')
    expect(result).not.toContain('px-2')
  })

  test('preserves class order for non-conflicting classes', () => {
    const result = cn('flex', 'items-center', 'justify-between', 'space-x-4')
    expect(result).toBe('flex items-center justify-between space-x-4')
  })

  test('handles responsive classes correctly', () => {
    const result = cn('block md:hidden', 'md:flex lg:block')
    expect(result).toContain('block')
    expect(result).toContain('md:flex')
    expect(result).toContain('lg:block')
  })
})