/** The teach-back textarea: prompt label, character meter, clover focus ring. */
export interface TeachBackBoxProps {
  value: string;
  onChange?: (next: string) => void;
  /** The "In your own words…" question */
  prompt?: string;
  /** Opens with "Start with…" */
  placeholder?: string;
  minChars?: number;
  rows?: number;
  style?: React.CSSProperties;
}
export declare function TeachBackBox(props: TeachBackBoxProps): JSX.Element;
