// ============================================
// 🔧 UTILITY CLASS - Main validator
// ============================================

import {CountryPattern, CountryPatternsData} from "./types";

export class CountryValidator {
	private patterns: Map<string, CountryPattern>;

	constructor(data: CountryPatternsData) {
		// Create a Map for O(1) lookups by country code
		this.patterns = new Map(
			data.countries.map(country => [country.code, country])
		);
	}

	/**
	 * 📱 Validate a phone number for a specific country
	 */
	validatePhone(countryCode: string, phoneNumber: string): boolean {
		const country = this.patterns.get(countryCode);
		if (!country) {
			throw new Error(`Country code "${countryCode}" not found`);
		}

		const regex = new RegExp(country.phone.pattern);
		return regex.test(phoneNumber);
	}

	/**
	 * 📮 Validate a postal code for a specific country
	 */
	validatePostal(countryCode: string, postalCode: string): boolean {
		const country = this.patterns.get(countryCode);
		if (!country) {
			throw new Error(`Country code "${countryCode}" not found`);
		}

		// Check if country has postal codes
		if (!country.postal.pattern) {
			throw new Error(`${country.name} does not use postal codes`);
		}

		const regex = new RegExp(country.postal.pattern);
		return regex.test(postalCode);
	}

	/**
	 * 🔍 Get country by code
	 */
	getCountry(countryCode: string): CountryPattern | undefined {
		return this.patterns.get(countryCode);
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
		const country = this.patterns.get(countryCode);
		return country?.postal.pattern !== null;
	}
}
