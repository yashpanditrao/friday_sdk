import { FridayClient } from './src/index';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

if (!process.env.FRIDAY_API_KEY) {
  throw new Error('FRIDAY_API_KEY is not defined in .env file');
}

const client = new FridayClient({
  apiKey: process.env.FRIDAY_API_KEY,
});

async function main() {
  try {
    const status = await client.get_status();
    console.log("✅ Status:", status);

    const scrapeResult = await client.scrape("https://fridaydata.tech", { formats: ["html", "markdown", "links"] });
    console.log("✅ Scrape Result:", scrapeResult);

    const crawlResult = await client.crawl("https://fridaydata.tech", {
      formats: ["html", "markdown", "links"],
      maxPages: 3
    });
    console.log("✅ Crawl Result:", crawlResult);

    const analyzeCompanyResult = await client.analyzeCompany("https://www.linkedin.com/company/raisegate/");
    console.log("✅ Analyze Company Result:", analyzeCompanyResult);

    const extractResult = await client.extract("https://fridaydata.tech", "Friday");
    console.log("✅ Extract Result:", extractResult);

    const searchResult = await client.search("Run Clubs in SF", "US", 10);
    console.log("✅ Search Result:", searchResult);
    
    const profileResult = await client.getProfile("https://www.linkedin.com/in/shlokparab/");
    console.log("✅ Profile Result:", profileResult);


  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main();