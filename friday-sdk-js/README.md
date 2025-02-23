# Friday SDK

Official SDK for the Friday API, available for both Python and JavaScript/TypeScript.

## Features

- LinkedIn Profile Analysis
- Company Analysis
- Web Scraping
- Web Crawling
- Google Search
- AI-powered Information Extraction
- Rate Limit Management

## Python SDK

### Installation

```bash
pip install friday-sdk
```

### Usage

```python
from friday_sdk import FridayClient

# Initialize the client
client = FridayClient(api_key='your-api-key')

# Analyze a LinkedIn profile
profile = client.get_profile('https://www.linkedin.com/in/username')

# Analyze a company
company = client.analyze_company('https://www.linkedin.com/company/companyname')

# Scrape a website
scrape_result = client.scrape(
    'https://example.com',
    formats=['html', 'markdown', 'links']
)

# Crawl a website
crawl_result = client.crawl(
    'https://example.com',
    formats=['html', 'markdown'],
    max_pages=5
)

# Perform a Google search
search_results = client.search(
    'your search query',
    location='US',
    num_results=15
)

# Extract information using AI
extracted_info = client.extract(
    'https://example.com',
    'Extract all pricing information from this page'
)

# Check API status
status = client.get_status()
```

## JavaScript/TypeScript SDK

### Installation

```bash
npm install friday-sdk
# or
yarn add friday-sdk
```

### Usage

```typescript
import { FridayClient } from 'friday-sdk';

// Initialize the client
const client = new FridayClient({
  apiKey: 'your-api-key'
});

// Analyze a LinkedIn profile
const profile = await client.getProfile('https://www.linkedin.com/in/username');

// Analyze a company
const company = await client.analyzeCompany('https://www.linkedin.com/company/companyname');

// Scrape a website
const scrapeResult = await client.scrape('https://example.com', {
  formats: ['html', 'markdown', 'links']
});

// Crawl a website
const crawlResult = await client.crawl('https://example.com', {
  formats: ['html', 'markdown'],
  maxPages: 5
});

// Perform a Google search
const searchResults = await client.search('your search query', {
  location: 'US',
  numResults: 15
});

// Extract information using AI
const extractedInfo = await client.extract(
  'https://example.com',
  'Extract all pricing information from this page'
);

// Check API status
const status = await client.get_status();
```

## Error Handling

Both SDKs include proper error handling and will throw exceptions/errors when:

- The API key is invalid or expired
- Rate limits are exceeded
- The API returns an error response
- Network issues occur

Example error handling in Python:

```python
from friday_sdk import FridayClient
import requests

try:
    client = FridayClient(api_key='your-api-key')
    result = client.get_profile('https://www.linkedin.com/in/username')
except requests.exceptions.HTTPError as e:
    print(f"HTTP error occurred: {e}")
except requests.exceptions.RequestException as e:
    print(f"Network error occurred: {e}")
```

Example error handling in TypeScript:

```typescript
try {
  const client = new FridayClient({
    apiKey: 'your-api-key'
  });
  const result = await client.getProfile('https://www.linkedin.com/in/username');
} catch (error) {
  console.error('An error occurred:', error.message);
}
```

## Rate Limits

The API includes rate limiting based on your API key type. You can check your current rate limit status using the `get_status()` method.

## Support

For support, please contact support@friday.dev or visit our documentation at https://docs.friday.dev 