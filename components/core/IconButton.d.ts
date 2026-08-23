/** Square pressable icon button; takes a Phosphor icon name or a node. */
export interface IconButtonProps {
  /** Phosphor icon name (bold weight), e.g. "gear", "x", "arrow-left" — or any ReactNode */
  icon: string | React.ReactNode;
  /** Accessible label (required) */
  label: string;
  variant?: 'ghost' | 'primary';
  /** Square side in px; keep >= 44 */
  size?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
