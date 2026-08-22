/** Result banner announcing the graded topic state with a coaching headline. */
export interface ResultBannerProps {
  state: 'Unassessed' | 'Gap' | 'Misconception' | 'Rusty' | 'Exam-Ready' | 'Mastered';
  /** Override the default coaching headline */
  message?: string;
  style?: React.CSSProperties;
}
export declare function ResultBanner(props: ResultBannerProps): JSX.Element;
