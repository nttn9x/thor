import clsx from 'clsx';

export const getContainerStyle = (mask?: boolean) => {
  return clsx(
    'w-full h-screen flex flex-col items-center justify-center',
    {
      'bg-stone-200 dark:bg-stone-950/50': !mask,
    },
  );
};

// Info
const infoContainer = 'content gap-10 flex flex-col items-center justify-center';
const infoContent =
  'text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center';

const infoStyles = {
  content: {
    infoContainer,
    name: `text-primary-500`,
    infoContent,
    infoKey: 'mx-1 text-primary-500',
  },
  mask: {
    infoContainer,
    name: 'text-white text-center',
    infoContent: `${infoContent} text-white`,
    infoKey: 'mx-1 text-black',
  },
};

export const getInfoStyle = (mask?: boolean) => {
  return infoStyles[mask ? 'mask' : 'content'];
};
