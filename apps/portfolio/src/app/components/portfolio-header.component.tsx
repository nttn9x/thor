import React from 'react';

interface IHeader {
  title: string;
}

const styles = {
  container:
    'tracking-widest sticky top-0 md:relative text-xs font-light tracking-[0.5em] opacity-80',
};

export default function Header({ title }: IHeader) {
  return <span className={styles.container}>{title}</span>;
}
