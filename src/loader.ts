// ============================================
// 📥 LOADING THE DATA - Different approaches
// ============================================

import { CountryPatternsData } from "./types";
import { CountryValidator } from "./util";

// ✅ Approach 1: Import directly (if using bundler like Webpack/Vite)
import patternsData from './countries.json';

const validator = new CountryValidator(patternsData);

// Or access countries directly without the wrapper
const countries = patternsData.countries;


export { validator, countries };