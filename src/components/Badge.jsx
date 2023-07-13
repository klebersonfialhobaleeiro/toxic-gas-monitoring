import React from 'react';

const Badge = ({ href, title, className, children }) => {
  return (
    <a href={href} title={title} className={`badge ${className}`} target="_blank" rel="noopener noreferrer">
      <span className="badge-text">{children}</span>
    </a>
  );
};

export default Badge;
