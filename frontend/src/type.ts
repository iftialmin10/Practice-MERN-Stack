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

export type ValidatorFn = (value: string) => boolean;

export interface InputProps {
  id: string;
  label: string;
  element: "input" | "textarea";
  type?: string;
  placeholder?: string;
  rows?: number;
  errorText: string;
  validators: Validator[];
  onInput: (id: string, value: string, isValid: boolean) => void;
  initialValue?: string;
  initialValid?: boolean;
}

export interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

export type InputAction =
  | {
      type: "CHANGE";
      val: string;
      validators: Validator[];
    }
  | {
      type: "TOUCH";
    };

export interface InputValue {
  value: string;
  isValid: boolean;
}

export type ValidatorType =
  | "REQUIRE"
  | "MINLENGTH"
  | "MAXLENGTH"
  | "MIN"
  | "MAX"
  | "EMAIL"
  | "FILE";

// Step 2: Validator Object Types
export type Validator =
  | { type: "REQUIRE" }
  | { type: "MINLENGTH"; val: number }
  | { type: "MAXLENGTH"; val: number }
  | { type: "MIN"; val: number }
  | { type: "MAX"; val: number }
  | { type: "EMAIL" }
  | { type: "FILE" };

// Step 3: Optional - you can type reusable components with
export type ValidatorFunction = (
  value: string,
  validators: Validator[]
) => boolean;

export interface FormInputs {
  [key: string]: InputValue;
}

export interface FormState {
  inputs: FormInputs;
  isValid: boolean;
}

export type FormAction = {
  type: "INPUT_CHANGE";
  inputId: string;
  value: string;
  isValid: boolean;
};
