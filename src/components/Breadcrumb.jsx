import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNameMap = {
    '': 'Home',
    'shop': 'Shop',
    'contact': 'Contact',
    'cart': 'Cart',
    'blog': 'Blog',
    'login': 'Login',
    'register': 'Register'
  };

  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNameMap[name] || name;

            return isLast ? (
              <li key={name} className="breadcrumb-item active" aria-current="page">
                {displayName}
              </li>
            ) : (
              <li key={name} className="breadcrumb-item">
                <Link to={routeTo}>{displayName}</Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;