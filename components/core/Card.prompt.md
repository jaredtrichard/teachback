The base surface: white, radius 20, 2px border, hard 3px bottom edge (never a blurry shadow).

```jsx
<Card>note content</Card>
<Card sunken padding={16}>tinted well inside a card</Card>
<Card accent="primary">celebration / result card</Card>
```

`sunken` makes a flat tinted well for nesting. `accent` colors the border for state-flavored cards.
