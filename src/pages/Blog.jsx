import React, { useState, useEffect } from 'react';
import './Blog.css';
import { PageContainer, HeroSection, SearchBox, Section, EmptyState } from '../components/UI';
import { BlogPostCard, FeaturedPost, BlogSidebar } from '../components/BlogComponents';

const Blog = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fashionPosts = [
    {
      id: 1,
      title: "2024 Fashion Trends: What's Hot This Season",
      body: "Discover the must-have pieces and styling secrets that are defining fashion this year. From sustainable materials to bold colors, we cover everything you need to know to stay ahead of the fashion curve.",
      author: "Sarah Johnson",
      date: "January 15, 2024",
      readTime: 8,
      views: 2500,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Sustainable Fashion: Building an Eco-Friendly Wardrobe",
      body: "Learn how to make conscious fashion choices that benefit both your style and the environment. Discover sustainable brands and eco-friendly materials that don't compromise on style.",
      author: "Emma Wilson",
      date: "January 12, 2024",
      readTime: 6,
      views: 1890,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=250&fit=crop"
    }
  ];

  const categories = ['Fashion Trends', 'Styling Tips', 'Sustainable Fashion', 'Accessories', 'Seasonal', 'Care Guide'];
  const trendingPosts = [
    { title: 'Winter Fashion Essentials', views: '3.2k views' },
    { title: 'Minimalist Wardrobe Guide', views: '2.8k views' },
    { title: 'Accessory Styling Secrets', views: '2.1k views' }
  ];

  useEffect(() => {
    setAllPosts(fashionPosts);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const viewPost = (postId) => {
    const post = allPosts.find(p => p.id === postId);
    alert(`Opening: ${post.title}\n\n${post.body}`);
  };

  const filteredPosts = searchTerm 
    ? allPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allPosts;

  const featuredPost = allPosts[0];
  const postsToShow = filteredPosts.slice(1);

  return (
    <PageContainer>
      <HeroSection 
        title="Fashion & Lifestyle Blog" 
        subtitle="Discover the latest trends, styling tips, and fashion insights"
        className="blog-hero"
      >
        <SearchBox 
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search articles..."
        />
      </HeroSection>

      {featuredPost && (
        <Section>
          <FeaturedPost post={featuredPost} onViewPost={viewPost} />
        </Section>
      )}

      <Section>
        <div className="row">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Latest Articles</h3>
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Sort by: Latest
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Latest</a></li>
                  <li><a className="dropdown-item" href="#">Most Popular</a></li>
                  <li><a className="dropdown-item" href="#">Most Viewed</a></li>
                </ul>
              </div>
            </div>

            <div className="row">
              {postsToShow.length > 0 ? (
                postsToShow.map((post) => (
                  <BlogPostCard key={post.id} post={post} onViewPost={viewPost} />
                ))
              ) : (
                <div className="col-12">
                  <EmptyState 
                    icon="search"
                    title="No posts found"
                    message="No posts found matching your search."
                  />
                </div>
              )}
            </div>

            <nav aria-label="Blog pagination" className="mt-5">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>

          <BlogSidebar categories={categories} trendingPosts={trendingPosts} />
        </div>
      </Section>
    </PageContainer>
  );
};

export default Blog;