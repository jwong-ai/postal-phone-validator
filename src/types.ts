// ============================================
// 📦 TYPES - Define country types to match JSON
// ============================================

export interface CountryPattern {
	name: string;
	code: string;
	flag: string;  // 🇺🇸 - native emoji
	postal: {
		pattern: string | null;
		note?: string;
	};
}

export interface CountryPatternsData {
	countries: CountryPattern[];
}
