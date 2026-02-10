# Postal & Phone Number Validator

A lightweight, high-performance TypeScript utility for validating phone numbers and postal codes across different countries.

## Features

- 🚀 **High Performance**: Pre-compiled and cached Regex patterns for fast validation.
- 🌍 **Multi-Country Support**: Supports validation for numerous countries based on ISO codes.
- 📱 **Phone & Postal Validation**: Validate both phone numbers and postal/ZIP codes using country-specific patterns.
- 🔡 **Case-Insensitive**: Supports country codes in any case (e.g., `us`, `US`, `Us`).
- 🛡️ **Type Safe**: Fully written in TypeScript with comprehensive type definitions.

## Installation

```bash
npm install
```

## Usage

### Basic Usage

```typescript
import { validator } from './src';

// Validate a US ZIP code
const isPostalValid = validator.validatePostal('US', '12345-6789');
console.log(isPostalValid); // true

// Validate a French phone number
const isPhoneValid = validator.validatePhone('FR', '0612345678');
console.log(isPhoneValid); // true
```

### Advanced Usage

You can also create your own instance of the validator if you have custom data:

```typescript
import { CountryValidator } from './src';
import myCustomData from './my-countries.json';

const myValidator = new CountryValidator(myCustomData);
```

## API Reference

### `CountryValidator`

#### `validatePhone(countryCode: string, phoneNumber: string): boolean`
Validates a phone number for the specified country. Throws an error if the country code is not found.

#### `validatePostal(countryCode: string, postalCode: string): boolean`
Validates a postal code for the specified country. Throws an error if the country code is not found or if the country doesn't use postal codes.

#### `hasPostalCodes(countryCode: string): boolean`
Returns `true` if the specified country uses postal codes.

#### `searchByName(searchTerm: string): CountryPattern[]`
Searches for countries by name (case-insensitive).

## Development

### Running Tests

This project uses [Vitest](https://vitest.dev/) for testing.

```bash
npm test
```

### Building

```bash
npm run build
```

## Project Structure

- `src/util.ts`: Core validation logic.
- `src/types.ts`: TypeScript interfaces.
- `src/countries.json`: Validation patterns data.
- `src/loader.ts`: Default instance exporter.
- `src/index.ts`: Main entry point.
