import Header from './portfolio-header.component';

import './portfolio-about-me.scss';
import { useTranslations } from 'next-intl';

interface IAboutPartOne {
  mask?: boolean;
}

const style = {
  container: 'grid grid-cols-6 gap-4',
  body: 'col-start-2 col-span-4',
  card: 'flex flex-col gap-4 mt-32',
};

export default function AboutPartOne({ mask }: IAboutPartOne) {
  const t = useTranslations('Portfolio');

  return (
    <div className={style.container}>
      <div className={style.body}>
        <div className={style.card}>
          <Header title={t('aboutMe')} />

          <div className="relative">
            {!mask && (
              <>
                <div className="opacity-20 z-10 text-6xl font-bold about-me-mask absolute top-0 left-0 ">
                  <>
                    {"I'm a "}
                    <span className="text-primary-500">
                      specifically skilled
                    </span>{' '}
                    guy with strong focus on producing high-quality & impactful
                    smooth user experience
                  </>
                </div>
                <div className="text-6xl font-bold content about-me relative z-20">
                  <>
                    {"I'm a "}
                    <span className="text-primary-500">
                      specifically skilled
                    </span>{' '}
                    guy with strong focus on producing high-quality & impactful
                    smooth user experience
                  </>
                </div>
              </>
            )}

            {mask && (
              <div className="text-6xl font-bold content about-me relative z-20">
                A dev guy with skills that haven't been replaced by A.I yet -
                Creating awesome things only if the paycheck is equaly good
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
