Square pressable icon-only button with the same hard-edge press physics as Button.

```jsx
<IconButton icon="x" label="Close" />
<IconButton icon="gear" label="Settings" variant="primary" />
```

`icon` takes a Phosphor (fill) name — the page must load `@phosphor-icons/web` CSS — or any ReactNode. Always pass `label`. Keep `size` at 44+.
