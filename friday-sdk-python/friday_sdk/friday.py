import requests
from typing import List, Dict, Optional, Union
from urllib.parse import urljoin

class FridayClient:
    """
    Python SDK for the Friday API.
    
    Args:
        api_key (str): Your Friday API key
        base_url (str, optional): Base URL for the API. Defaults to production URL.
    """
    
    def __init__(self, api_key: str, base_url: str = "https://friday-data.up.railway.app"):
        self.api_key = api_key
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({
            "X-API-Key": api_key,
            "Content-Type": "application/json"
        })

    def _make_request(self, method: str, endpoint: str, **kwargs) -> dict:
        """Make a request to the API."""
        url = urljoin(self.base_url, endpoint)
        response = self.session.request(method, url, **kwargs)
        response.raise_for_status()
        return response.json()

    def get_profile(self, profile_url: str) -> dict:
        """
        Fetch and analyze a LinkedIn profile.
        
        Args:
            profile_url (str): LinkedIn profile URL to analyze
            
        Returns:
            dict: Analyzed profile data
        """
        return self._make_request("GET", "/profile", params={"profile_url": profile_url})

    def analyze_company(self, linkedin_url: str) -> dict:
        """
        Analyze a company based on its LinkedIn URL.
        
        Args:
            linkedin_url (str): Company's LinkedIn URL
            
        Returns:
            dict: Company analysis data
        """
        return self._make_request("POST", "/analyze-company", json={"linkedin_url": linkedin_url})

    def scrape(self, url: str, formats: List[str] = ["html"]) -> dict:
        """
        Scrape a website.
        
        Args:
            url (str): URL to scrape
            formats (list): List of formats to return. Options: ["html", "markdown", "links"]
            
        Returns:
            dict: Scraped data in requested formats
        """
        return self._make_request("POST", "/scrape", json={
            "url": url,
            "formats": formats
        })

    def crawl(self, url: str, formats: List[str] = ["html"], max_pages: int = 10) -> dict:
        """
        Crawl a website.
        
        Args:
            url (str): Starting URL to crawl
            formats (list): List of formats to return. Options: ["html", "markdown", "links"]
            max_pages (int): Maximum number of pages to crawl
            
        Returns:
            dict: Crawled data for each page
        """
        return self._make_request("POST", "/crawl", json={
            "url": url,
            "formats": formats,
            "max_pages": max_pages
        })

    def search(self, query: str, location: str = "US", num_results: int = 15) -> dict:
        """
        Perform a Google search.
        
        Args:
            query (str): Search query
            location (str): Country code for search location (e.g., "US", "UK")
            num_results (int): Number of results to return
            
        Returns:
            dict: Search results including titles, URLs, and snippets
        """
        return self._make_request("POST", "/search", json={
            "query": query,
            "location": location,
            "num_results": num_results
        })

    def extract(self, url: str, query: str) -> dict:
        """
        Extract specific information from a website using AI.
        
        Args:
            url (str): Website URL to analyze
            query (str): Query describing what information to extract
            
        Returns:
            dict: Extracted information
        """
        return self._make_request("POST", "/extract", json={
            "url": url,
            "query": query
        })

    def get_status(self) -> dict:
        """
        Get current API key status and rate limit information.
        
        Returns:
            dict: API key status information
        """
        return self._make_request("GET", "/status") 