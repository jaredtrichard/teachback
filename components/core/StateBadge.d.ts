/** Pill badge for the canonical topic-state vocabulary. */
export interface StateBadgeProps {
  /** Canonical state name — never renamed */
  state: 'Unassessed' | 'Gap' | 'Misconception' | 'Rusty' | 'Exam-Ready' | 'Mastered';
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
export declare function StateBadge(props: StateBadgeProps): JSX.Element;
