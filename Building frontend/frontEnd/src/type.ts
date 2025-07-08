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
  show: boolean;
  onClick: () => void;
};

export type BackdropsProps = {
  onClick: () => void;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Place = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: Coordinates;
};

export type PlaceListProps = {
  items: Place[];
};

export type PlaceItemProps = {
  id: string;
  image: string;
  title: string;
  address: string;
  description: string;
  creatorId: string;
  coordinates: Coordinates;
};
