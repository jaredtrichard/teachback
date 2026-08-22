/** White rounded panel with 2px border and hard 3px edge. */
export interface CardProps {
  /** Tinted well (no edge shadow) instead of raised white card */
  sunken?: boolean;
  /** Color the 2px border: primary | accent | info | star | danger | mastered */
  accent?: 'primary' | 'accent' | 'info' | 'star' | 'danger' | 'mastered';
  padding?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
