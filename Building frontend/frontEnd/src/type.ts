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

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  to?: string;
  size?: "small" | "default" | "large";
  inverse?: boolean;
  danger?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

export type ModalProps = {
  show: boolean;
  onCancel: () => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  header?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
};

export type MapProps = {
  className?: string;
  style: React.CSSProperties;
  center: { lat: number; lng: number };
  zoom: number;
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ol: any;
  }
}
