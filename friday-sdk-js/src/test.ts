import { FridayClient } from './friday';
import dotenv from 'dotenv';

// Set timeout for all tests
jest.setTimeout(60000);

describe('FridayClient', () => {
  let client: FridayClient;

  beforeEach(() => {
    // Load environment variables
    dotenv.config();
    // Get API key from environment variable, with a default test key
    const apiKey = process.env.FRIDAY_API_KEY || 'test_key';
    client = new FridayClient(apiKey);
  });

  afterAll(done => {
    // Cleanup any pending handles
    done();
  });

  describe('getProfile', () => {
    it('should fetch and analyze a LinkedIn profile', async () => {
      const profile = await client.getProfile('https://linkedin.com/in/yashpanditrao');
      expect(profile).toBeDefined();
      expect(typeof profile).toBe('object');
    }, 60000);
  });

  describe('analyzeCompany', () => {
    it('should analyze a company based on LinkedIn URL', async () => {
      const analysis = await client.analyzeCompany('https://linkedin.com/company/raisegate');
      expect(analysis).toBeDefined();
      expect(typeof analysis).toBe('object');
    }, 60000);
  });

  describe('scrape', () => {
    it('should scrape a website', async () => {
      expect.assertions(2);
      try {
        const scraped = await client.scrape('https://raisegate.com', ['html', 'markdown']);
        expect(scraped).toBeDefined();
        expect(typeof scraped).toBe('object');
      } catch (error: any) {
        console.warn('Warning: scrape test failed:', error.message);
      }
    });
  });

  describe('crawl', () => {
    it('should crawl a website', async () => {
      expect.assertions(2);
      try {
        const crawled = await client.crawl('https://raisegate.com', ['html'], 2);
        expect(crawled).toBeDefined();
        expect(typeof crawled).toBe('object');
      } catch (error: any) {
        console.warn('Warning: crawl test failed:', error.message);
      }
    });
  });

  describe('search', () => {
    it('should perform a Google search', async () => {
      const response = await client.search('fundraising platforms for startups', 'US', 5);
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      const results = response.data;
      if (Array.isArray(results)) {
        expect(results.length).toBeLessThanOrEqual(5);
        expect(Array.isArray(results)).toBe(true);
      } else {
        expect(results).toEqual([]);
      }
    }, 60000);
  });

  describe('extract', () => {
    it('should extract information from a website', async () => {
      expect.assertions(2);
      try {
        const extracted = await client.extract(
          'https://supabase.com',
          'Extract the main features in json format'
        );
        expect(extracted).toBeDefined();
        expect(['object', 'array']).toContain(typeof extracted);
      } catch (error: any) {
        console.warn('Warning: extract test failed:', error.message);
      }
    });
  });

  describe('getStatus', () => {
    it('should get API status and rate limit information', async () => {
      expect.assertions(2);
      try {
        const status = await client.getStatus();
        expect(status).toBeDefined();
        expect(typeof status).toBe('object');
      } catch (error: any) {
        console.warn('Warning: getStatus test failed:', error.message);
      }
    });
  });
}); 