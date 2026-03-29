import React from 'react';
import * as styles from './portfolio-banner.style';

interface IBannerInfo {
  mask?: boolean;
}

const i18n = {
  content: {
    hello: "Nguyen Nguyen",
    content: ['BUILD', 'WHATEVER', 'YOU', 'WANT'],
  },
  mask: {
    hello: "Nguyen Nguyen 🫰",
    content: ['BUILD', 'SHIT', 'FOR', 'YOU'],
  },
};

export default function BannerInfo({ mask }: IBannerInfo) {
  const i18nContent = i18n[mask ? 'mask' : 'content'];
  const style = styles.getInfoStyle(mask);

  return (
    <div className={styles.getContainerStyle(mask)}>
      <div className={style.infoContainer}>
        <div className="text-base text-center">
          <span className="text-secondary">{i18nContent.hello}</span>
        </div>

        <div className={style.infoContent}>
          <div>{i18nContent.content[0]}</div>
          <div className={style.infoKey}>{i18nContent.content[1]}</div>
          <div>{i18nContent.content[2]}</div>
          <div>{i18nContent.content[3]}</div>
        </div>
      </div>
    </div>
  );
}
