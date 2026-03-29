import React from 'react';
import clsx from 'clsx';

import Banner from './portfolio-banner/portfolio-banner.component';
import AboutMe from './portfolio-about-me.component';
import Skills from './portfolio-skills.component';
import Experience from './portfolio-experience/portfolio-experience.component';
import { usePortfolioContext } from '../contexts/portfolio.context';

import Footer from './portfolio-footer.component';

const Portfolio = () => {
  const { root, mask } = usePortfolioContext();

  return (
    <>
      <div
        ref={root}
        className="z-0 flex flex-col text-stone-600 dark:text-[--text-body]"
      >
        <Banner />
        <AboutMe />
        <Skills />
        <Experience />
        <Footer />
      </div>

      <div
        ref={mask}
        className={clsx(
          'absolute z-[100] top-0 left-0 right-0 flex flex-col pointer-events-none dark:text-black',
          'mask',
        )}
      >
        <Banner mask />
        <AboutMe mask />
        <Skills />
        <Experience />
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;
