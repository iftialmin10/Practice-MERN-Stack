export type User = {
  id: string;
  image: string;
  name: string;
  places: number;
};

export type UserItemProps = {
  id: string;
  image: string;
  name: string;
  placeCount: number;
};

export type AvatarProps = {
  image: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
};

export type CardProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export type MainHeaderProps = {
  children: React.ReactNode;
};

export type MainNavigationProps = {};

export type NavLinksProps = {};

export type SideDrawerProps = {
  children: React.ReactNode;
};
