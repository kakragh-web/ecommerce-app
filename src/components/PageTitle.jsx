import React, { useEffect } from 'react';

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - eValet`;
  }, [title]);

  return null;
};

export default PageTitle;