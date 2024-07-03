export function formatCurrency(value: string, useFormater: boolean = false, locale: string = 'id-ID', currency: string = 'IDR') {
	let numericValue = parseFloat(value.replace(/[\D\sRp.]/g, '')); // Menghapus karakter selain angka

	if (!isNaN(numericValue)) {
		if (useFormater) {
			return new Intl.NumberFormat(locale, {
				style: 'currency',
				currency: currency,
				minimumFractionDigits: 0,
			}).format(numericValue);
		} else if (!useFormater) {
			return new Intl.NumberFormat(locale, {
				minimumFractionDigits: 0, // Menampilkan 2 digit desimal
			}).format(numericValue);
		}
	}

	return '';
}

/**
 * 
 * ================================================================================
 * Url Type
 * 	//  1 = ini method get success dengan "verification_status": "on_review"
 *	//  2 = ini method get success dengan "verification_status": "waiting_verify"
 *	//  3 = ini method get success dengan "verification_status": "failed"
 *	//  4 = ini method post 200
 *	//  5 = ini method post 200 status error
 *	//  6 = ini method get success dengan "verification_status": "success"
 *
 * ================================================================================
 *
 * response Type
 * 	//  1 = success
 *
 * ================================================================================
 */
interface UrlData {
	url: string;
	statusCode: number;
}
export function urlForTest(urlType: number = 1, responseType:number = 1): UrlData  {

	let response = 0;
	if (responseType === 1) {
		response = 200;
	}



	let urls = ''
	if (urlType === 1) {
		urls = '/2be4a0f2-b641-4a26-a849-70db734ad18c' // ini method get success dengan "verification_status": "on_review"
	} else if (urlType === 2) {
		urls = "/27c4bc6d-86e3-438a-a2a4-02ae5b7fbcc1" // ini method get success dengan "verification_status": "waiting_verify"
	} else if (urlType === 3) {
		urls = "/50202837-9f41-4fc7-a55d-7cf85bb27f5f" // ini method get success dengan "verification_status": "failed"
	} else if (urlType === 4) {
		urls = "/845f2aaf-07e5-426d-a70b-cc2e326220a4" // ini method post 200
	} else if (urlType === 5) {
		urls = "/0f89590a-4320-4c6b-a274-a0243eef3f09" // ini method post 200 status error
	} else if (urlType === 6) {
		urls = "/79542165-bf41-429f-852c-23d5ecfabf3c	" // ini method get success dengan "verification_status": "success"
	}

	let url = process.env.NEXT_PUBLIC_API_BASE_URL + urls;
	let statusCode = response;
	return {url, statusCode}
}