
const scraperObject = {
	url: 'https://topexpo.io/market?template=Rare%20Land', //replace with any link 
	async scraper(browser){
		return new Promise(async (resolve, reject) => {
			try {
		let page = await browser.newPage();
		console.log(`Analyzing NFTs on ${this.url}...`);
		console.log('Lots of data. This can and should take a while. Grab a coffee or something..')
		await page.goto(this.url,{
			waitUntil: 'networkidle0',
			timeout: 0,
		  });;
		
		let xyz = await page.evaluate(async () => {
			let results = [];
			
			let items = document.querySelectorAll('div div.item-description');
			// #root > div > div.market-container > div.items-container > div.items-wrapper > div:nth-child(1) > div > div.item-description
			// #root > div > div.market-container > div.items-container > div.items-wrapper > div:nth-child(3)
			const delay = async ms => new Promise(res => setTimeout(res, ms));
			let i = 0;
			await delay(15000);
			items.forEach((item) => {
				
				
				

				results.push({text: item.innerText});
				i += 1;
				
				
			});
			results.push(i);
			
			
			return results;
		});

		
		

		console.log("The Scraped NFT List for the Selected Link is:")

		console.log(xyz);
		
		console.log("Try a new link?");
		browser.close();
		return resolve(xyz);
        
			}
			catch (e) {
				return reject(e);
			}	
	})
}
}

module.exports = scraperObject;
