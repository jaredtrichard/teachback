/** Celebration/coaching banner for a graded teach-back; optional XP pill. */
export interface ResultBannerProps {
  state: 'Unassessed' | 'Gap' | 'Misconception' | 'Rusty' | 'Exam-Ready' | 'Mastered';
  /** XP earned this attempt — renders a gold pill */
  xp?: number;
  /** Override the default coaching headline */
  message?: string;
  style?: React.CSSProperties;
}
export declare function ResultBanner(props: ResultBannerProps): JSX.Element;
