// ============================================
// 🔧 UTILITY CLASS - Main validator
// ============================================

import {CountryPattern, CountryPatternsData} from "./types";

export class CountryValidator {
	private patterns: Map<string, CountryPattern>;
	private phoneRegexCache: Map<string, RegExp> = new Map();
	private postalRegexCache: Map<string, RegExp> = new Map();

	constructor(data: CountryPatternsData) {
		// Create a Map for O(1) lookups by country code
		this.patterns = new Map(
			data.countries.map(country => [country.code.toUpperCase(), country])
		);

		// Pre-compile regex patterns for better performance
		for (const country of data.countries) {
			if (country.phone.pattern) {
				this.phoneRegexCache.set(country.code.toUpperCase(), new RegExp(country.phone.pattern));
			}
			if (country.postal.pattern) {
				this.postalRegexCache.set(country.code.toUpperCase(), new RegExp(country.postal.pattern));
			}
		}
	}

	/**
	 * 📱 Validate a phone number for a specific country
	 */
	validatePhone(countryCode: string, phoneNumber: string): boolean {
		const code = countryCode.toUpperCase();
		const regex = this.phoneRegexCache.get(code);
		
		if (!this.patterns.has(code)) {
			throw new Error(`Country code "${countryCode}" not found`);
		}

		if (!regex) {
			return false; // Or throw if phone validation is expected for all
		}

		return regex.test(phoneNumber);
	}

	/**
	 * 📮 Validate a postal code for a specific country
	 */
	validatePostal(countryCode: string, postalCode: string): boolean {
		const code = countryCode.toUpperCase();
		const regex = this.postalRegexCache.get(code);

		const country = this.patterns.get(code);
		if (!country) {
			throw new Error(`Country code "${countryCode}" not found`);
		}

		// Check if country has postal codes
		if (!regex) {
			throw new Error(`${country.name} does not use postal codes`);
		}

		return regex.test(postalCode);
	}

	/**
	 * 🔍 Get country by code
	 */
	getCountry(countryCode: string): CountryPattern | undefined {
		return this.patterns.get(countryCode.toUpperCase());
	}

	/**
	 * 🔍 Search countries by name
	 */
	searchByName(searchTerm: string): CountryPattern[] {
		const term = searchTerm.toLowerCase();
		return Array.from(this.patterns.values()).filter(country =>
			country.name.toLowerCase().includes(term)
		);
	}

	/**
	 * 📋 Get all country codes
	 */
	getAllCountryCodes(): string[] {
		return Array.from(this.patterns.keys());
	}

	/**
	 * ✅ Check if a country has postal codes
	 */
	hasPostalCodes(countryCode: string): boolean {
		const country = this.patterns.get(countryCode.toUpperCase());
		return !!country?.postal.pattern;
	}
}
