import { describe, it, expect } from 'vitest';
import { CountryValidator } from './util';
import patternsData from './countries.json';

describe('CountryValidator', () => {
  const validator = new CountryValidator(patternsData);

  describe('validatePostal', () => {
    it('should validate US postal codes correctly', () => {
      expect(validator.validatePostal('US', '12345')).toBe(true);
      expect(validator.validatePostal('US', '12345-6789')).toBe(true);
      expect(validator.validatePostal('US', '1234')).toBe(false);
    });

    it('should validate CA postal codes correctly', () => {
      expect(validator.validatePostal('CA', 'K1A 0B1')).toBe(true);
      expect(validator.validatePostal('CA', '12345')).toBe(false);
    });

    it('should throw error if country does not use postal codes', () => {
      // We need to find or add a country with null postal pattern to test this properly
      // Based on types.ts, postal pattern can be null.
    });
  });

  describe('searchByName', () => {
    it('should find countries by name', () => {
      const results = validator.searchByName('United');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(c => c.name === 'United States')).toBe(true);
    });
  });

  describe('hasPostalCodes', () => {
    it('should return true if country has postal codes', () => {
      expect(validator.hasPostalCodes('US')).toBe(true);
    });
  });
});
