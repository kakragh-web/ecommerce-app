import React from 'react';
import { Card, Button, Badge, MetaInfo } from './UI';

// Blog Post Card Component
export const BlogPostCard = ({ post, onViewPost }) => (
  <div className="col-md-6 mb-4">
    <Card hover>
      <img src={post.image} className="card-img-top" alt={post.title} />
      <div className="card-body">
        <MetaInfo items={[{ icon: 'calendar-alt', text: post.date }]} />
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body.substring(0, 100)}...</p>
        <div className="d-flex justify-content-between align-items-center">
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={() => onViewPost(post.id)}
          >
            Read More
          </Button>
          <small className="text-muted">{post.readTime} min read</small>
        </div>
      </div>
    </Card>
  </div>
);

// Featured Post Component
export const FeaturedPost = ({ post, onViewPost }) => (
  <div className="featured-post p-5">
    <div className="row align-items-center">
      <div className="col-lg-6">
        <Badge variant="warning" className="text-dark mb-3">Featured Article</Badge>
        <h2 className="display-5 fw-bold mb-4">{post.title}</h2>
        <p className="lead mb-4">{post.body.substring(0, 150)}...</p>
        <MetaInfo items={[
          { icon: 'calendar-alt', text: post.date },
          { icon: 'user', text: post.author },
          { icon: 'eye', text: `${post.views} views` }
        ]} />
        <Button size="lg" onClick={() => onViewPost(post.id)}>
          Read Full Article
        </Button>
      </div>
      <div className="col-lg-6">
        <img src={post.image} alt={post.title} className="img-fluid rounded-3" />
      </div>
    </div>
  </div>
);

// Blog Sidebar Component
export const BlogSidebar = ({ categories, trendingPosts }) => (
  <div className="col-lg-4">
    <div className="sidebar-widget">
      <h5 className="mb-4">Categories</h5>
      <div className="d-flex flex-wrap">
        {categories.map((category, index) => (
          <a key={index} href="#" className="category-tag">{category}</a>
        ))}
      </div>
    </div>

    <div className="sidebar-widget">
      <h5 className="mb-4">Trending Now</h5>
      {trendingPosts.map((post, index) => (
        <div key={index} className="trending-item">
          <div className="trending-number">{index + 1}</div>
          <div>
            <h6 className="mb-1">{post.title}</h6>
            <small className="text-muted">{post.views}</small>
          </div>
        </div>
      ))}
    </div>

    <div className="sidebar-widget text-center">
      <h5 className="mb-3">Stay Updated</h5>
      <p className="mb-4">Get the latest fashion tips and trends delivered to your inbox.</p>
      <div className="input-group mb-3">
        <input type="email" className="form-control" placeholder="Your email" />
        <Button>Subscribe</Button>
      </div>
      <small className="text-muted">No spam, unsubscribe anytime</small>
    </div>
  </div>
);