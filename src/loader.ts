// ============================================
// 📥 LOADING THE DATA - Different approaches
// ============================================

import { CountryValidator } from "./util";

// ✅ Approach 1: Import directly (if using bundler like Webpack/Vite)
import patternsData from './countries.json';

/**
 * Represents a validator for country-specific data using predefined patterns.
 * This class is designed to validate values against country-specific formats.
 *
 * @class validator
 * @param {Object} patternsData - An object containing regex patterns or validation rules
 *                                for multiple countries. Each key typically represents
 *                                a country code, and its value defines the respective
 *                                validation pattern or rule.
 */
export const validator = new CountryValidator(patternsData);

// Or access countries directly without the wrapper
/**
 * @constant countries
 * Represents a collection of countries derived from the patternsData source.
 * This variable typically contains data related to various countries, which may include
 * their names, codes, or other related information.
 */
export const countries = patternsData.countries;
