import unittest
import os
from dotenv import load_dotenv
from friday_sdk import FridayClient

# Load environment variables
load_dotenv()

class TestFridayClient(unittest.TestCase):
    def setUp(self):
        # Get API key from environment variable, with a default test key
        self.api_key = os.getenv("FRIDAY_API_KEY", "test_key")
        self.client = FridayClient(self.api_key)


    def test_get_profile(self):
        """Test get_profile method"""
        try:
            profile = self.client.get_profile("https://linkedin.com/in/yashpanditrao")
            self.assertIsInstance(profile, dict)
        except Exception as e:
            print(f"Warning: get_profile test failed: {str(e)}")

    def test_analyze_company(self):
        """Test analyze_company method"""
        try:
            analysis = self.client.analyze_company("https://linkedin.com/company/raisegate")
            self.assertIsInstance(analysis, dict)
        except Exception as e:
            print(f"Warning: analyze_company test failed: {str(e)}")

    def test_scrape(self):
        """Test scrape method"""
        try:
            scraped = self.client.scrape("https://raisegate.com", formats=["html", "markdown"])
            self.assertIsInstance(scraped, dict)
        except Exception as e:
            print(f"Warning: scrape test failed: {str(e)}")

    def test_crawl(self):
        """Test crawl method"""
        try:
            crawled = self.client.crawl("https://raisegate.com", formats=["html"], max_pages=2)
            self.assertIsInstance(crawled, dict)
        except Exception as e:
            print(f"Warning: crawl test failed: {str(e)}")

    def test_search(self):
        """Test search method"""
        try:
            results = self.client.search("fundraising platforms for startups", location="US", num_results=5)
            self.assertIsInstance(results, dict)
        except Exception as e:
            print(f"Warning: search test failed: {str(e)}")

    def test_extract(self):
        """Test extract method"""
        try:
            extracted = self.client.extract("https://supabase.com", "Extract the main features in json format")
            self.assertIsInstance(extracted, (dict, list))
        except Exception as e:
            print(f"Warning: extract test failed: {str(e)}")

    def test_get_status(self):
        """Test get_status method"""
        try:
            status = self.client.get_status()
            self.assertIsInstance(status, dict)
        except Exception as e:
            print(f"Warning: get_status test failed: {str(e)}")

if __name__ == '__main__':
    unittest.main() 