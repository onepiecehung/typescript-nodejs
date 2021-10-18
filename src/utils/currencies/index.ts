// import Fetch from "node-fetch";

// export const currencies = Object.freeze({
// 	"AED": { currencyName: "UAE Dirham", country: "United Arab Emirates" },
// 	"AFN": { currencyName: "Afghan Afghani", country: "Afghanistan" },
// 	"ALL": { currencyName: "Albanian Lek", country: "Albania" },
// 	"AMD": { currencyName: "Armenian Dram", country: "Armenia" },
// 	"ANG": { currencyName: "Netherlands Antillian Guilder", country: "Netherlands Antilles" },
// 	"AOA": { currencyName: "Angolan Kwanza", country: "Angola" },
// 	"ARS": { currencyName: "Argentine Peso", country: "Argentina" },
// 	"AUD": { currencyName: "Australian Dollar", country: "Australia" },
// 	"AWG": { currencyName: "Aruban Florin", country: "Aruba" },
// 	"AZN": { currencyName: "Azerbaijani Manat", country: "Azerbaijan" },
// 	"BAM": { currencyName: "Bosnia and Herzegovina Mark", country: "Bosnia and Herzegovina" },
// 	"BBD": { currencyName: "Barbados Dollarm", country: "Barbados" },
// 	"BDT": { currencyName: "Bangladeshi Taka", country: "Bangladesh" },
// 	"BGN": { currencyName: "Bulgarian Lev", country: "Bulgaria" },
// 	"BHD": { currencyName: "Bahraini Dinar", country: "Bahrain" },
// 	"BIF": { currencyName: "Burundian Franc", country: "Burundi" },
// 	"BMD": { currencyName: "Bermudian Dollar", country: "Bermuda" },
// 	"BND": { currencyName: "Brunei Dollar", country: "Brunei" },
// 	"BOB": { currencyName: "Bolivian Boliviano", country: "Bolivia" },
// 	"BRL": { currencyName: "Brazilian Real", country: "Brazil" },
// 	"BSD": { currencyName: "Bahamian Dollar", country: "Bahamas" },
// 	"BTN": { currencyName: "Bhutanese Ngultrum", country: "Bhutan" },
// 	"BWP": { currencyName: "Botswana Pula", country: "Botswana" },
// 	"BYN": { currencyName: "Belarusian Ruble", country: "Belarus" },
// 	"BZD": { currencyName: "Belize Dollar", country: "Belize" },
// 	"CAD": { currencyName: "Canadian Dollar", country: "Canada" },
// 	"CDF": { currencyName: "Congolese Franc", country: "Democratic Republic of the Congo" },
// 	"CHF": { currencyName: "Swiss Franc", country: "Switzerland" },
// 	"CLP": { currencyName: "Chilean Peso", country: "Chile" },
// 	"CNY": { currencyName: "Chinese Renminbi", country: "China" },
// 	"COP": { currencyName: "Colombian Peso", country: "Colombia" },
// 	"CRC": { currencyName: "Costa Rican Colon", country: "Costa Rica" },
// 	"CUC": { currencyName: "Cuban Convertible Peso", country: "Cuba" },
// 	"CUP": { currencyName: "Cuban Peso", country: "Cuba" },
// 	"CVE": { currencyName: "Cape Verdean Escudo", country: "Cape Verde" },
// 	"CZK": { currencyName: "Czech Koruna", country: "Czech Republic" },
// 	"DJF": { currencyName: "Djiboutian Franc", country: "Djibouti" },
// 	"DKK": { currencyName: "Danish Krone", country: "Denmark" },
// 	"DOP": { currencyName: "Dominican Peso", country: "Dominican Republic" },
// 	"DZD": { currencyName: "Algerian Dinar", country: "Algeria" },
// 	"EGP": { currencyName: "Egyptian Pound", country: "Egypt" },
// 	"ERN": { currencyName: "Eritrean Nakfa", country: "Eritrea" },
// 	"ETB": { currencyName: "Ethiopian Birr", country: "Ethiopia" },
// 	"EUR": { currencyName: "Euro", country: "European Union" },
// 	"FJD": { currencyName: "Fiji Dollar", country: "Fiji" },
// 	"FKP": { currencyName: "Falkland Islands Pound", country: "Falkland Islands" },
// 	"FOK": { currencyName: "Faroese Króna", country: "Faroe Islands" },
// 	"GBP": { currencyName: "Pound Sterling", country: "United Kingdom" },
// 	"GEL": { currencyName: "Georgian Lari", country: "Georgia" },
// 	"GGP": { currencyName: "Guernsey Pound", country: "Guernsey" },
// 	"GHS": { currencyName: "Ghanaian Cedi", country: "Ghana" },
// 	"GIP": { currencyName: "Gibraltar Pound", country: "Gibraltar" },
// 	"GMD": { currencyName: "Gambian Dalasi", country: "The Gambia" },
// 	"GNF": { currencyName: "Guinean Franc", country: "Guinea" },
// 	"GTQ": { currencyName: "Guatemalan Quetzal", country: "Guatemala" },
// 	"GYD": { currencyName: "Guyanese Dollar", country: "Guyana" },
// 	"HKD": { currencyName: "Hong Kong Dollar", country: "Hong Kong" },
// 	"HNL": { currencyName: "Honduran Lempira", country: "Honduras" },
// 	"HRK": { currencyName: "Croatian Kuna", country: "Croatia" },
// 	"HTG": { currencyName: "Haitian Gourde", country: "Haiti" },
// 	"HUF": { currencyName: "Hungarian Forint", country: "Hungary" },
// 	"IDR": { currencyName: "Indonesian Rupiah", country: "Indonesia" },
// 	"ILS": { currencyName: "Israeli New Shekel", country: "Israel" },
// 	"IMP": { currencyName: "Manx Pound", country: "Isle of Man" },
// 	"INR": { currencyName: "Indian Rupee", country: "India" },
// 	"IQD": { currencyName: "Iraqi Dinar", country: "Iraq" },
// 	"IRR": { currencyName: "Iranian Rial", country: "Iran" },
// 	"ISK": { currencyName: "Icelandic Króna", country: "Iceland" },
// 	"JMD": { currencyName: "Jamaican Dollar", country: "Jamaica" },
// 	"JOD": { currencyName: "Jordanian Dinar", country: "Jordan" },
// 	"JPY": { currencyName: "Japanese Yen", country: "Japan" },
// 	"KES": { currencyName: "Kenyan Shilling", country: "Kenya" },
// 	"KGS": { currencyName: "Kyrgyzstani Som", country: "Kyrgyzstan" },
// 	"KHR": { currencyName: "Cambodian Riel", country: "Cambodia" },
// 	"KID": { currencyName: "Kiribati Dollar", country: "Kiribati" },
// 	"KMF": { currencyName: "Comorian Franc", country: "Comoros" },
// 	"KRW": { currencyName: "South Korean Won", country: "South Korea" },
// 	"KWD": { currencyName: "Kuwaiti Dinar", country: "Kuwait" },
// 	"KYD": { currencyName: "Cayman Islands Dollar", country: "Cayman Islands" },
// 	"KZT": { currencyName: "Kazakhstani Tenge", country: "Kazakhstan" },
// 	"LAK": { currencyName: "Lao Kip", country: "Laos" },
// 	"LBP": { currencyName: "Lebanese Pound", country: "Lebanon" },
// 	"LKR": { currencyName: "Sri Lanka Rupee", country: "Sri Lanka" },
// 	"LRD": { currencyName: "Liberian Dollar", country: "Liberia" },
// 	"LSL": { currencyName: "Lesotho Loti", country: "Lesotho" },
// 	"LYD": { currencyName: "Libyan Dinar", country: "Libya" },
// 	"MAD": { currencyName: "Moroccan Dirham", country: "Morocco" },
// 	"MDL": { currencyName: "Moldovan Leu", country: "Moldova" },
// 	"MGA": { currencyName: "Malagasy Ariary", country: "Madagascar" },
// 	"MKD": { currencyName: "Macedonian Denar", country: "North Macedonia" },
// 	"MMK": { currencyName: "Burmese Kyat", country: "Myanmar" },
// 	"MNT": { currencyName: "Mongolian Tögrög", country: "Mongolia" },
// 	"MOP": { currencyName: "Macanese Pataca", country: "Macau" },
// 	"MRU": { currencyName: "Mauritanian Ouguiya", country: "Mauritania" },
// 	"MUR": { currencyName: "Mauritian Rupee", country: "Mauritius" },
// 	"MVR": { currencyName: "Maldivian Rufiyaa", country: "Maldives" },
// 	"MWK": { currencyName: "Malawian Kwacha", country: "Malawi" },
// 	"MXN": { currencyName: "Mexican Peso", country: "Mexico" },
// 	"MYR": { currencyName: "Malaysian Ringgit", country: "Malaysia" },
// 	"MZN": { currencyName: "Mozambican Metical", country: "Mozambique" },
// 	"NAD": { currencyName: "Namibian Dollar", country: "Namibia" },
// 	"NGN": { currencyName: "Nigerian Naira", country: "Nigeria" },
// 	"NIO": { currencyName: "Nicaraguan Córdoba", country: "Nicaragua" },
// 	"NOK": { currencyName: "Norwegian Krone", country: "Norway" },
// 	"NPR": { currencyName: "Nepalese Rupee", country: "Nepal" },
// 	"NZD": { currencyName: "New Zealand Dollar", country: "New Zealand" },
// 	"OMR": { currencyName: "Omani Rial", country: "Oman" },
// 	"PAB": { currencyName: "Panamanian Balboa", country: "Panama" },
// 	"PEN": { currencyName: "Peruvian Sol", country: "Peru" },
// 	"PGK": { currencyName: "Papua New Guinean Kina", country: "Papua New Guinea" },
// 	"PHP": { currencyName: "Philippine Peso", country: "Philippines" },
// 	"PKR": { currencyName: "Pakistani Rupee", country: "Pakistan" },
// 	"PLN": { currencyName: "Polish Złoty", country: "Poland" },
// 	"PYG": { currencyName: "Paraguayan Guaraní", country: "Paraguay" },
// 	"QAR": { currencyName: "Qatari Riyal", country: "Qatar" },
// 	"RON": { currencyName: "Romanian Leu", country: "Romania" },
// 	"RSD": { currencyName: "Serbian Dinar", country: "Serbia" },
// 	"RUB": { currencyName: "Russian Ruble", country: "Russia" },
// 	"RWF": { currencyName: "Rwandan Franc", country: "Rwanda" },
// 	"SAR": { currencyName: "Saudi Riyal", country: "Saudi Arabia" },
// 	"SBD": { currencyName: "Solomon Islands Dollar", country: "Solomon Islands" },
// 	"SCR": { currencyName: "Seychellois Rupee", country: "Seychelles" },
// 	"SDG": { currencyName: "Sudanese Pound", country: "Sudan" },
// 	"SEK": { currencyName: "Swedish Krona", country: "Sweden" },
// 	"SGD": { currencyName: "Singapore Dollar", country: "Singapore" },
// 	"SHP": { currencyName: "Saint Helena Pound", country: "Saint Helena" },
// 	"SLL": { currencyName: "Sierra Leonean Leone", country: "Sierra Leone" },
// 	"SOS": { currencyName: "Somali Shilling", country: "Somalia" },
// 	"SRD": { currencyName: "Surinamese Dollar", country: "Suriname" },
// 	"SSP": { currencyName: "South Sudanese Pound", country: "South Sudan" },
// 	"STN": { currencyName: "São Tomé and Príncipe Dobra", country: "São Tomé and Príncipe" },
// 	"SYP": { currencyName: "Syrian Pound", country: "Syria" },
// 	"SZL": { currencyName: "Eswatini Lilangeni", country: "Eswatini" },
// 	"THB": { currencyName: "Thai Baht", country: "Thailand" },
// 	"TJS": { currencyName: "Tajikistani Somoni", country: "Tajikistan" },
// 	"TMT": { currencyName: "Turkmenistan Manat", country: "Turkmenistan" },
// 	"TND": { currencyName: "Tunisian Dinar", country: "Tunisia" },
// 	"TOP": { currencyName: "Tongan Paʻanga", country: "Tonga" },
// 	"TRY": { currencyName: "Turkish Lira", country: "Turkey" },
// 	"TTD": { currencyName: "Trinidad and Tobago Dollar", country: "Trinidad and Tobago" },
// 	"TVD": { currencyName: "Tuvaluan Dollar", country: "Tuvalu" },
// 	"TWD": { currencyName: "New Taiwan Dollar", country: "Taiwan" },
// 	"TZS": { currencyName: "Tanzanian Shilling", country: "Tanzania" },
// 	"UAH": { currencyName: "Ukrainian Hryvnia", country: "Ukraine" },
// 	"UGX": { currencyName: "Ugandan Shilling", country: "Uganda" },
// 	"USD": { currencyName: "United States Dollar", country: "United States" },
// 	"UYU": { currencyName: "Uruguayan Peso", country: "Uruguay" },
// 	"UZS": { currencyName: `Uzbekistani So"m`, country: "Uzbekistan" },
// 	"VES": { currencyName: "Venezuelan Bolívar Soberano", country: "Venezuela" },
// 	"VND": { currencyName: "Vietnamese Đồng", country: "Vietnam" },
// 	"VUV": { currencyName: "Vanuatu Vatu", country: "Vanuatu" },
// 	"WST": { currencyName: "Samoan Tālā", country: "Samoa" },
// 	"XAF": { currencyName: "Central African CFA Franc", country: "CEMAC" },
// 	"XCD": { currencyName: "East Caribbean Dollar", country: "Organisation of Eastern Caribbean States" },
// 	"XDR": { currencyName: "Special Drawing Rights", country: "International Monetary Fund" },
// 	"XOF": { currencyName: "West African CFA franc", country: "CFA" },
// 	"XPF": { currencyName: "CFP Franc", country: `Collectivités d"Outre-Mer` },
// 	"YER": { currencyName: "Yemeni Rial", country: "Yemen" },
// 	"ZAR": { currencyName: "South African Rand", country: "South Africa" },
// 	"ZMW": { currencyName: "Zambian Kwacha", country: "Zambia" }
// });

// export type TMoney = {
// 	value: number;
// 	currency: string;
// }

// export const api: string = `https://v6.exchangerate-api.com/v6/6291c7bd979ce5b857a64a9e/latest`;

// class CurrencyConverter {
// 	private _rates: { [key: string]: any } = {};
// 	private _currenciesEnum: string[] = Object.keys(currencies).map(x => x.toLowerCase());

// 	constructor() {

// 	}

// 	async getRates(currencyCode: string) {
// 		const currencyCodeLowerCase = currencyCode.toLowerCase();

// 		// Validate from currency
// 		if (!this._currenciesEnum.includes(currencyCode.toLowerCase())) {
// 			throw Error("Unknown currency");
// 		}

// 		// return currency rates if getted
// 		if (this._rates[currencyCodeLowerCase]) {
// 			return this._rates[currencyCodeLowerCase];
// 		}

// 		const response = await Fetch(`${api}/${currencyCode.toUpperCase()}`);

// 		if (!response.ok) {
// 			throw Error(response.statusText);
// 		}

// 		return this._rates[currencyCodeLowerCase] = await response.json();
// 	}

// 	async convert(from: TMoney, toCurrencyCode: string): Promise<TMoney> {
// 		try {
// 			// Validate from currency
// 			if (!this._currenciesEnum.includes(from.currency.toLowerCase())) {
// 				throw Error("Unknown currency of input [from]");
// 			}

// 			// Validate to currency
// 			if (!this._currenciesEnum.includes(toCurrencyCode.toLowerCase())) {
// 				throw Error("Unknown currency of output [to]");
// 			}

// 			const fromRates = await this.getRates(from.currency);

// 			if (!fromRates.conversion_rates) {
// 				throw Error("Exchange rates format invalid.");
// 			}

// 			if (!fromRates.conversion_rates[toCurrencyCode.toUpperCase()]) {
// 				throw Error(`Exchange rate of [${toCurrencyCode}] not found.`);
// 			}

// 			return {
// 				value: from.value * (fromRates.conversion_rates[toCurrencyCode.toUpperCase()] as number),
// 				currency: toCurrencyCode.toUpperCase()
// 			};
// 		}
// 		catch(error) {
// 			console.error(error);
// 			throw error;
// 		}
// 	}

// }

// export default new CurrencyConverter();
