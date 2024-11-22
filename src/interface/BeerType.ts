interface BeerType {
	sku: string;
	name: string;
	sub_category_1: string;
	sub_category_2?: string;
	sub_category_3?: string;
	country: string;
	abv: string;
	tasting_notes: string;
	food_pairing: string;
}

export default BeerType;
