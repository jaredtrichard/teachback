/** Pill progress track — section completion and note read progress. */
export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'primary' | 'accent' | 'star' | 'info' | 'mastered';
  height?: number;
  /** Optional uppercase label row with percent readout */
  label?: string;
  style?: React.CSSProperties;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
