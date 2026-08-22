/** One rubric criterion verdict: mark bubble, label, feedback, outcome tag. */
export interface CriterionRowProps {
  label: string;
  feedback?: string;
  /** Canonical rubric outcomes from the grading engine */
  outcome?: 'hit' | 'partial' | 'missing' | 'wrong' | 'hedged';
  style?: React.CSSProperties;
}
export declare function CriterionRow(props: CriterionRowProps): JSX.Element;
