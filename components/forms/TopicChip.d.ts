/** Pill chip for picking a topic; shows its ID and a state dot. */
export interface TopicChipProps {
  /** Topic id, e.g. "T004" */
  id: string;
  title: string;
  state?: 'Unassessed' | 'Gap' | 'Misconception' | 'Rusty' | 'Exam-Ready' | 'Mastered';
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function TopicChip(props: TopicChipProps): JSX.Element;
