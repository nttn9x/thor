import './portfolio-main.scss';

import React from 'react';

import PortfolioContext from '../contexts/portfolio.context';

import Portfolio from './portfolio-main.component';

const Container = () => {
  return (
    <PortfolioContext>
      <Portfolio />
    </PortfolioContext>
  );
};

export default Container;
