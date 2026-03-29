import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

interface IProps {
  children: React.ReactNode;
}

interface IPortfolioContext {
  root?: React.RefObject<HTMLDivElement | null>;
  mask?: React.RefObject<HTMLDivElement | null>;
}

export const PortfolioContext = createContext<IPortfolioContext>({});

const Portfolio = ({ children }: IProps) => {
  const mask = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mask?.current || !root?.current) {
      return;
    }

    const ctx = gsap.context((self: any) => {
      const contents = gsap.utils.toArray<HTMLDivElement>('.content');

      const toggleSizedCursor = (large?: boolean) => {
        if (large) {
          gsap.to(mask.current, {
            '--size': '350px',
            duration: 0.4,
            ease: 'sine.out',
          });
        } else {
          gsap.to(mask.current, {
            '--size': '30px',
            duration: 0.4,
            ease: 'sine.out',
          });
        }
      };

      const toggleShowHideCursor = (show?: boolean) => {
        gsap.killTweensOf('.hidden-cursor');
        if (show) {
          gsap.to(mask.current, {
            '--size': '0px',
            duration: 0.3,
            ease: 'sine.out',
          });
        } else {
          gsap.to(mask.current, {
            '--size': '30px',
            duration: 1,
            ease: 'sine.out',
          });
        }
      };

      if (contents) {
        for (let i = 0; i < contents.length; i++) {
          contents[i].addEventListener('mousemove', function () {
            toggleSizedCursor(true);
          });

          contents[i].addEventListener('mouseleave', function () {
            toggleSizedCursor(false);
          });
        }
      }

      const mouse_pos = { x: 0, y: 0, scrollY: 0, lastY: 0 };
      document.addEventListener('mousemove', (e: MouseEvent) => {
        const x = e.pageX;
        const y = e.pageY;

        gsap.to(mask.current, {
          '--x': `${x}px`,
          '--y': `${y}px`,
          duration: 0.3,
          ease: 'sine.out',
        });

        mask.current?.setAttribute('data-y', String(y));

        mouse_pos.x = e.pageX;
        mouse_pos.y = e.pageY;
      });

      document.addEventListener('scroll', () => {
        let y: any = parseInt(mask.current?.getAttribute('data-y') || '0');

        const top = document.documentElement.scrollTop;
        let lastScrolledTop: any = parseInt(
          mask.current?.getAttribute('data-l') || '0',
        );

        if (lastScrolledTop != top) {
          y -= lastScrolledTop;
          lastScrolledTop = top;
          y += lastScrolledTop;
        }

        gsap.to(mask.current, {
          ease: 'none',
          '--y': `${y}px`,
          duration: 0,
        });
        mask.current?.setAttribute('data-l', lastScrolledTop);
        mask.current?.setAttribute('data-y', y);

        let isHovered;
        let isHovered1;

        const nodes = root.current?.querySelectorAll('.content') || [];
        const hiddenNodes =
          root.current?.querySelectorAll('.hidden-cursor') || [];
        for (let i = 0; i < nodes.length; i++) {
          const bounding_rect = nodes[i].getBoundingClientRect();

          if (
            mouse_pos.x > bounding_rect.left &&
            mouse_pos.x < bounding_rect.right &&
            y > bounding_rect.top + lastScrolledTop &&
            y < bounding_rect.bottom + lastScrolledTop
          ) {
            isHovered = true;
            break;
          } else {
            isHovered = false;
          }
        }

        for (let i = 0; i < hiddenNodes.length; i++) {
          const bounding_rect = hiddenNodes[i].getBoundingClientRect();

          if (
            mouse_pos.x > bounding_rect.left &&
            mouse_pos.x < bounding_rect.right &&
            y > bounding_rect.top + lastScrolledTop &&
            y < bounding_rect.bottom + lastScrolledTop
          ) {
            isHovered1 = true;
            break;
          } else {
            isHovered1 = false;
          }
        }

        if (isHovered1) {
          toggleShowHideCursor(isHovered1);
        } else {
          toggleSizedCursor(isHovered);
        }
      });

      const headers = root.current?.querySelectorAll('.hidden-cursor');
      if (headers) {
        for (let i = 0; i < headers.length; i++) {
          headers[i].addEventListener('mousemove', function () {
            toggleShowHideCursor(true);
          });
          headers[i].addEventListener('mouseout', function () {
            toggleShowHideCursor(false);
          });
        }
      }

      // About me
      const split = SplitText.create('.about-me', {
        type: 'lines',
        linesClass: 'about-me-content',
      });

      const aboutMeLines = self.selector('.about-me-content');
      aboutMeLines.forEach((box: any, index: number) => {
        gsap.from(box, {
          '--xAPercent': '100%',
          scrollTrigger: {
            trigger: box,
            start: `bottom bottom-=${index * 30}`,
            end: `top 75%`,
            scrub: true,
          },
        });
      });

      gsap.from(split.chars, {
        duration: 1,
        y: 100, // animate from 100px below
      });

      const aboutMeMaskLines = SplitText.create('.about-me-mask', {
        type: 'lines',
        linesClass: 'about-me-mask-line',
      });
      gsap.from(aboutMeMaskLines.chars, {
        duration: 1,
        y: 100, // animate from 100px below
      });

      // Skills
      const boxes = self.selector('.heading-content');
      boxes.forEach((box: any) => {
        gsap.from(box, {
          '--xPercent': '100%',
          scrollTrigger: {
            trigger: box,
            start: 'bottom bottom',
            end: 'top 80%',
            scrub: true,
          },
        });
      });
    }, root); // <- Scope!

    return () => ctx.revert(); // <- Cleanup!
  }, [root?.current, mask?.current]);

  return (
    <PortfolioContext.Provider value={{ mask, root }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () =>
  useContext<IPortfolioContext>(PortfolioContext);

export default Portfolio;
