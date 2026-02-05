import React from 'react';

// Page Container Component
export const PageContainer = ({ children, paddingTop = "100px" }) => (
  <div style={{ paddingTop }}>
    {children}
  </div>
);

// Section Component
export const Section = ({ className = "", children, ...props }) => (
  <section className={`py-5 ${className}`} {...props}>
    <div className="container">
      {children}
    </div>
  </section>
);

// Hero Section Component
export const HeroSection = ({ title, subtitle, children, className = "" }) => (
  <section className={`text-center ${className}`}>
    <div className="container">
      <h1 className="display-4 fw-bold mb-4">{title}</h1>
      {subtitle && <p className="lead mb-4">{subtitle}</p>}
      {children}
    </div>
  </section>
);

// Search Box Component
export const SearchBox = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="input-group">
        <input 
          type="text" 
          className="form-control search-box" 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button className="btn btn-light" type="button">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  </div>
);

// Card Component
export const Card = ({ children, className = "", hover = false }) => (
  <div className={`card ${hover ? 'blog-card' : ''} ${className}`}>
    {children}
  </div>
);

// Button Component
export const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "", 
  className = "",
  disabled = false,
  ...props 
}) => (
  <button 
    className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

// Badge Component
export const Badge = ({ children, variant = "primary", className = "" }) => (
  <span className={`badge bg-${variant} ${className}`}>
    {children}
  </span>
);

// Meta Info Component
export const MetaInfo = ({ items }) => (
  <div className="blog-meta mb-2">
    {items.map((item, index) => (
      <span key={index}>
        <i className={`fas fa-${item.icon} me-2`}></i>
        {item.text}
        {index < items.length - 1 && <span className="ms-3"></span>}
      </span>
    ))}
  </div>
);

// Sidebar Widget Component
export const SidebarWidget = ({ title, children, className = "" }) => (
  <div className={`sidebar-widget ${className}`}>
    <h5 className="mb-4">{title}</h5>
    {children}
  </div>
);

// Trending Item Component
export const TrendingItem = ({ number, title, views }) => (
  <div className="trending-item">
    <div className="trending-number">{number}</div>
    <div>
      <h6 className="mb-1">{title}</h6>
      <small className="text-muted">{views}</small>
    </div>
  </div>
);

// Category Tag Component
export const CategoryTag = ({ children, href = "#" }) => (
  <a href={href} className="category-tag">
    {children}
  </a>
);

// Empty State Component
export const EmptyState = ({ icon, title, message, actionButton }) => (
  <div className="text-center py-5">
    <i className={`fas fa-${icon} fa-3x text-muted mb-3`}></i>
    <h3>{title}</h3>
    <p className="text-muted mb-4">{message}</p>
    {actionButton}
  </div>
);

// Form Group Component
export const FormGroup = ({ label, children, className = "" }) => (
  <div className={`mb-3 ${className}`}>
    {label && <label className="form-label">{label}</label>}
    {children}
  </div>
);

// Input Component
export const Input = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = "",
  ...props 
}) => (
  <input 
    type={type}
    className={`form-control ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    {...props}
  />
);

// Textarea Component
export const Textarea = ({ 
  placeholder, 
  value, 
  onChange, 
  rows = 3,
  required = false,
  className = "",
  ...props 
}) => (
  <textarea 
    className={`form-control ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
    required={required}
    {...props}
  />
);

// Select Component
export const Select = ({ 
  options, 
  value, 
  onChange, 
  placeholder,
  required = false,
  className = "",
  ...props 
}) => (
  <select 
    className={`form-control ${className}`}
    value={value}
    onChange={onChange}
    required={required}
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);