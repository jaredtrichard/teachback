/**
 * Restrained pressable button: hard 3px bottom edge, presses down physically.
 * @startingPoint section="Components" subtitle="Restrained pressable button with hard edge" viewport="700x260"
 */
export interface ButtonProps {
  /** Fill family: primary (clover) | accent (tangerine) | info (splash) | danger (soft coral) | star (sunny) */
  variant?: 'primary' | 'accent' | 'info' | 'danger' | 'star' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Outline style: transparent fill, 1px border in the variant color */
  ghost?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
