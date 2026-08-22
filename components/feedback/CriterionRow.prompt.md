Per-criterion grading feedback line: circled typographic mark (✓ / ! / · / ~), criterion label, coaching feedback, uppercase outcome tag. Stack them in a Card for the full rubric readout.

```jsx
<CriterionRow outcome="hit" label="SIPC covers brokerage failure" feedback="Clearly stated with the advance mechanics." />
<CriterionRow outcome="wrong" label="Coverage limits" feedback="The $250,000 cash sublimit was inverted." />
```

Outcomes are the engine's vocabulary: hit, partial, missing, wrong, hedged. `wrong` uses soft coral — never harsh red.
