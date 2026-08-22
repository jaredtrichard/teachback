/* @ds-bundle: {"format":4,"namespace":"TeachbackDesignSystem_417209","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"StateBadge","sourcePath":"components/core/StateBadge.jsx"},{"name":"StreakBadge","sourcePath":"components/core/StreakBadge.jsx"},{"name":"CriterionRow","sourcePath":"components/feedback/CriterionRow.jsx"},{"name":"ResultBanner","sourcePath":"components/feedback/ResultBanner.jsx"},{"name":"TeachBackBox","sourcePath":"components/forms/TeachBackBox.jsx"},{"name":"TopicChip","sourcePath":"components/forms/TopicChip.jsx"}],"sourceHashes":{"components/core/Button.jsx":"dffd2a9af157","components/core/Card.jsx":"0d9ac0509e80","components/core/IconButton.jsx":"dfa72346bb73","components/core/ProgressBar.jsx":"f8bc11d881e5","components/core/StateBadge.jsx":"810a0a25092b","components/core/StreakBadge.jsx":"70ab39a9fd82","components/feedback/CriterionRow.jsx":"22c72e51fe32","components/feedback/ResultBanner.jsx":"b12ca72d8138","components/forms/TeachBackBox.jsx":"b4a21aad9482","components/forms/TopicChip.jsx":"f05431774c65","ui_kits/app/ios-frame.jsx":"24642b887be3","ui_kits/app/screens.jsx":"4d5fb1b87f81","ui_kits/web/data.js":"7e189bdb9a90","ui_kits/web/screens.jsx":"9107e1db2411"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TeachbackDesignSystem_417209 = window.TeachbackDesignSystem_417209 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
const FILLS = {
  primary: ['var(--clover-500)', 'var(--clover-600)', 'var(--clover-700)', '#fff'],
  accent: ['var(--tangerine-500)', 'var(--tangerine-600)', 'var(--tangerine-700)', '#fff'],
  info: ['var(--splash-500)', 'var(--splash-600)', 'var(--splash-700)', '#fff'],
  danger: ['var(--coral-500)', 'var(--coral-600)', 'var(--coral-700)', '#fff'],
  star: ['var(--sunny-500)', 'var(--sunny-600)', 'var(--sunny-700)', '#6B5200']
};
const SIZES = {
  sm: {
    pad: '9px 14px',
    font: '600 13px var(--font-display)',
    edge: 2,
    rad: 'var(--radius-sm)'
  },
  md: {
    pad: '13px 20px',
    font: '600 15px var(--font-display)',
    edge: 3,
    rad: 'var(--radius-md)'
  },
  lg: {
    pad: '16px 26px',
    font: '600 18px var(--font-display)',
    edge: 3,
    rad: 'var(--radius-md)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  ghost = false,
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false),
    [press, setPress] = useState(false);
  const f = FILLS[variant] || FILLS.primary,
    s = SIZES[size] || SIZES.md;
  const isGhost = ghost || variant === 'ghost';
  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: 0,
    borderRadius: s.rad,
    padding: s.pad,
    font: s.font,
    letterSpacing: '.01em',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
    minHeight: 44,
    transition: 'transform var(--dur-press) linear, box-shadow var(--dur-press) linear, background var(--dur-press) linear'
  };
  const sty = isGhost ? {
    ...base,
    background: hover && !disabled ? 'var(--tint)' : 'transparent',
    color: disabled ? 'var(--text-faint)' : f[0],
    border: '1px solid ' + (disabled ? 'var(--border)' : f[0]),
    boxShadow: press ? 'none' : `0 ${s.edge - 1}px 0 ${disabled ? 'var(--border)' : f[2]}`,
    transform: press ? `translateY(${s.edge - 1}px)` : 'none'
  } : {
    ...base,
    background: disabled ? 'var(--border)' : hover ? f[1] : f[0],
    color: disabled ? 'var(--text-faint)' : f[3],
    boxShadow: disabled || press ? 'none' : `0 ${s.edge}px 0 ${f[2]}`,
    transform: press && !disabled ? `translateY(${s.edge}px)` : 'none'
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: onClick,
    style: {
      ...sty,
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
const ACCENTS = {
  primary: 'var(--clover-500)',
  accent: 'var(--tangerine-500)',
  info: 'var(--splash-500)',
  star: 'var(--sunny-500)',
  danger: 'var(--coral-500)',
  mastered: 'var(--teal-500)'
};
function Card({
  sunken = false,
  accent,
  padding = 24,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: sunken ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: '1px solid ' + (accent ? ACCENTS[accent] || 'var(--border)' : 'var(--border)'),
      borderRadius: 'var(--radius-lg)',
      boxShadow: sunken ? 'none' : 'var(--edge-card)',
      padding,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const {
  useState
} = React;
function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 44,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false),
    [press, setPress] = useState(false);
  const filled = variant === 'primary';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      width: size,
      height: size,
      display: 'inline-grid',
      placeItems: 'center',
      border: '1px solid ' + (filled ? 'transparent' : 'var(--border)'),
      borderRadius: 'var(--radius-md)',
      background: filled ? hover ? 'var(--clover-600)' : 'var(--clover-500)' : hover ? 'var(--tint)' : 'var(--paper)',
      color: filled ? '#fff' : 'var(--text-muted)',
      fontSize: Math.round(size * .45),
      cursor: 'pointer',
      boxShadow: press ? 'none' : `0 3px 0 ${filled ? 'var(--clover-700)' : 'var(--border-strong)'}`,
      transform: press ? 'translateY(2px)' : 'none',
      transition: 'transform var(--dur-press) linear, box-shadow var(--dur-press) linear',
      ...style
    }
  }, typeof icon === 'string' ? /*#__PURE__*/React.createElement("i", {
    className: `ph-bold ph-${icon}`,
    "aria-hidden": "true"
  }) : icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
const FILLS = {
  primary: 'var(--clover-500)',
  accent: 'var(--tangerine-500)',
  star: 'var(--sunny-500)',
  info: 'var(--splash-500)',
  mastered: 'var(--teal-500)'
};
function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  height = 16,
  label,
  style
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: '700 11px var(--font-body)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemax": max,
    style: {
      height,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: FILLS[color] || FILLS.primary,
      transition: 'width var(--dur-slide) var(--ease-out)',
      boxShadow: 'inset 0 -4px 0 rgba(0,0,0,.12)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/StateBadge.jsx
try { (() => {
const KEY = s => s.toLowerCase().replace('-', '');
function StateBadge({
  state,
  size = 'md',
  style
}) {
  const k = KEY(state);
  const pad = size === 'lg' ? '10px 18px' : size === 'sm' ? '4px 10px' : '6px 13px';
  const fs = size === 'lg' ? 15 : size === 'sm' ? 11 : 13;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: pad,
      borderRadius: 'var(--radius-pill)',
      background: `var(--state-${k}-bg)`,
      color: `var(--state-${k})`,
      font: `700 ${fs}px var(--font-body)`,
      whiteSpace: 'nowrap',
      ...style
    }
  }, state);
}
Object.assign(__ds_scope, { StateBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StateBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/StreakBadge.jsx
try { (() => {
function StreakBadge({
  count,
  active = true,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '8px 14px',
      borderRadius: 'var(--radius-pill)',
      background: active ? 'var(--tangerine-100)' : 'var(--surface-sunken)',
      border: '1px solid ' + (active ? 'var(--tangerine-500)' : 'var(--border)'),
      color: active ? 'var(--tangerine-700)' : 'var(--text-faint)',
      font: '700 15px var(--font-display)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-flame",
    "aria-hidden": "true",
    style: {
      fontSize: 18,
      color: active ? 'var(--tangerine-500)' : 'var(--text-faint)'
    }
  }), count, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 11px var(--font-body)',
      letterSpacing: '.06em'
    }
  }, "DAY", count === 1 ? '' : 'S'));
}
Object.assign(__ds_scope, { StreakBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StreakBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/CriterionRow.jsx
try { (() => {
const OUT = {
  hit: {
    mark: '✓',
    fill: 'var(--clover-100)',
    fg: 'var(--clover-700)'
  },
  partial: {
    mark: '·',
    fill: 'var(--sunny-100)',
    fg: 'var(--sunny-700)'
  },
  missing: {
    mark: '·',
    fill: 'var(--surface-sunken)',
    fg: 'var(--text-faint)'
  },
  wrong: {
    mark: '!',
    fill: 'var(--coral-100)',
    fg: 'var(--coral-700)'
  },
  hedged: {
    mark: '~',
    fill: 'var(--splash-100)',
    fg: 'var(--splash-700)'
  }
};
function CriterionRow({
  label,
  feedback,
  outcome = 'missing',
  style
}) {
  const o = OUT[outcome] || OUT.missing;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '26px minmax(0,1fr) auto',
      gap: 11,
      alignItems: 'start',
      padding: '12px 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: o.fill,
      color: o.fg,
      font: '700 13px/24px var(--font-body)',
      textAlign: 'center',
      border: '1px solid ' + o.fg
    }
  }, o.mark), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: 'block',
      color: 'var(--text-body)',
      font: '700 13px/1.35 var(--font-body)'
    }
  }, label), feedback && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 3,
      color: 'var(--text-muted)',
      font: '600 12px/1.5 var(--font-body)'
    }
  }, feedback)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: o.fg,
      font: '700 10px var(--font-body)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      paddingTop: 5
    }
  }, outcome));
}
Object.assign(__ds_scope, { CriterionRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/CriterionRow.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ResultBanner.jsx
try { (() => {
const KEY = s => s.toLowerCase().replace('-', '');
const HEADS = {
  Gap: 'Not yet — the core mechanism was absent.',
  Misconception: 'Careful — a rule was stated incorrectly.',
  Rusty: 'Getting there — right pieces, not enough coverage.',
  'Exam-Ready': 'Nice — that explanation is exam-ready!',
  Mastered: 'Mastered. Confirmed across separate days.',
  Unassessed: 'No teach-back graded yet.'
};
function ResultBanner({
  state,
  message,
  style
}) {
  const k = KEY(state);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '18px 22px',
      borderRadius: 'var(--radius-lg)',
      background: `var(--state-${k}-bg)`,
      border: `1px solid var(--state-${k})`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 44,
      height: 44,
      flex: '0 0 44px',
      borderRadius: '50%',
      background: `var(--state-${k})`,
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontSize: 22
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph-bold ' + (k === 'examready' || k === 'mastered' ? 'ph-check-fat' : k === 'gap' ? 'ph-arrow-counter-clockwise' : k === 'misconception' ? 'ph-warning' : 'ph-arrows-clockwise')
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: 'block',
      color: `var(--state-${k})`,
      font: '600 19px var(--font-display)'
    }
  }, message || HEADS[state]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      font: '600 13px var(--font-body)'
    }
  }, "Topic state: ", state)));
}
Object.assign(__ds_scope, { ResultBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ResultBanner.jsx", error: String((e && e.message) || e) }); }

// components/forms/TeachBackBox.jsx
try { (() => {
const {
  useState
} = React;
function TeachBackBox({
  value,
  onChange,
  prompt,
  placeholder,
  minChars = 20,
  rows = 8,
  style
}) {
  const [focus, setFocus] = useState(false);
  const n = (value || '').length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      ...style
    }
  }, prompt && /*#__PURE__*/React.createElement("label", {
    style: {
      font: '600 15px var(--font-body)',
      color: 'var(--text-body)',
      lineHeight: 1.5
    }
  }, prompt), /*#__PURE__*/React.createElement("textarea", {
    rows: rows,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: 'block',
      width: '100%',
      boxSizing: 'border-box',
      resize: 'vertical',
      padding: 16,
      border: '1px solid ' + (focus ? 'var(--clover-500)' : 'var(--border)'),
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      background: focus ? 'var(--paper)' : 'var(--surface-sunken)',
      color: 'var(--text-body)',
      font: '600 15px/1.65 var(--font-body)',
      boxShadow: focus ? '0 2px 0 var(--clover-700)' : 'none',
      transition: 'border-color var(--dur-press) linear, box-shadow var(--dur-press) linear'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 11px var(--font-mono)',
      color: n >= minChars ? 'var(--clover-600)' : 'var(--text-faint)'
    }
  }, n, " characters", n < minChars ? ` · write at least a couple of sentences` : ''));
}
Object.assign(__ds_scope, { TeachBackBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TeachBackBox.jsx", error: String((e && e.message) || e) }); }

// components/forms/TopicChip.jsx
try { (() => {
const {
  useState
} = React;
function TopicChip({
  id,
  title,
  state = 'Unassessed',
  selected = false,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false),
    [press, setPress] = useState(false);
  const on = selected || hover;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-pressed": selected,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '11px 16px',
      minHeight: 44,
      border: '1px solid ' + (on ? 'var(--clover-500)' : 'var(--border)'),
      borderRadius: 'var(--radius-pill)',
      background: selected ? 'var(--clover-100)' : 'var(--paper)',
      color: selected ? 'var(--clover-700)' : 'var(--text-muted)',
      font: '600 13px var(--font-body)',
      cursor: 'pointer',
      boxShadow: press ? 'none' : '0 2px 0 ' + (on ? 'var(--clover-700)' : 'var(--border-strong)'),
      transform: press ? 'translateY(2px)' : 'none',
      transition: 'all var(--dur-press) linear',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-mono)',
      color: 'var(--tangerine-600)'
    }
  }, id), title, state !== 'Unassessed' && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: `var(--state-${state.toLowerCase().replace('-', '')})`
    }
  }));
}
Object.assign(__ds_scope, { TopicChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TopicChip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return (
    /*#__PURE__*/
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    React.createElement("div", {
      "data-om-starter": "ios-frame",
      style: {
        width,
        height,
        borderRadius: 48,
        overflow: 'hidden',
        position: 'relative',
        background: dark ? '#000' : '#F2F2F7',
        boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
        fontFamily: '-apple-system, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 11,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 126,
        height: 37,
        borderRadius: 24,
        background: '#000',
        zIndex: 50
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }
    }, /*#__PURE__*/React.createElement(IOSStatusBar, {
      dark: dark
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
      title: title,
      dark: dark
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto'
      }
    }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
      dark: dark
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 8,
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 139,
        height: 5,
        borderRadius: 100,
        background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
      }
    })))
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/screens.jsx
try { (() => {
const {
  Button,
  Card,
  StateBadge,
  ProgressBar,
  StreakBadge,
  TeachBackBox,
  CriterionRow,
  ResultBanner,
  IconButton
} = window.TeachbackDesignSystem_417209;
const pathTopics = [{
  id: 'T001',
  title: 'SEC, FINRA & SROs',
  state: 'Exam-Ready'
}, {
  id: 'T004',
  title: 'SIPC vs FDIC',
  state: 'Rusty'
}, {
  id: 'T005',
  title: 'Investor categories',
  state: 'Exam-Ready'
}, {
  id: 'T010',
  title: 'Primary vs secondary market',
  state: 'Unassessed'
}, {
  id: 'T011',
  title: 'Offerings & dilution',
  state: 'Unassessed',
  locked: true
}];
const stateColor = s => `var(--state-${s.toLowerCase().replace('-', '')})`;
function PathNode({
  t,
  i
}) {
  const done = t.state === 'Exam-Ready' || t.state === 'Mastered';
  const off = [0, 44, 0, -44, 0][i % 5];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      justifyItems: 'center',
      gap: 6,
      transform: `translateX(${off}px)`
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": t.title,
    style: {
      width: 74,
      height: 74,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: t.locked ? 'var(--surface-sunken)' : done ? 'var(--clover-500)' : t.state === 'Unassessed' ? 'var(--splash-500)' : stateColor(t.state),
      boxShadow: t.locked ? '0 3px 0 var(--border-strong)' : '0 4px 0 ' + (t.locked ? 'var(--border-strong)' : done ? 'var(--clover-700)' : t.state === 'Unassessed' ? 'var(--splash-700)' : 'var(--sunny-700)'),
      display: 'grid',
      placeItems: 'center',
      color: t.locked ? 'var(--text-faint)' : '#fff',
      fontSize: 30
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph-bold ' + (t.locked ? 'ph-lock-simple' : done ? 'ph-check-fat' : 'ph-chat-circle-text')
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 11px var(--font-body)',
      color: t.locked ? 'var(--text-faint)' : 'var(--text-body)',
      maxWidth: 120,
      textAlign: 'center',
      lineHeight: 1.25
    }
  }, t.title));
}
function HomeScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 30px',
      display: 'grid',
      gap: 18,
      background: 'var(--surface-page)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 24px var(--font-display)',
      color: 'var(--text-body)'
    }
  }, "teach", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--clover-500)'
    }
  }, "back")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(StreakBadge, {
    count: 7,
    style: {
      padding: '5px 11px'
    }
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: 16
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 12,
    max: 28,
    label: "Section 1 \xB7 Capital markets"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      color: 'var(--text-muted)',
      font: '600 12px var(--font-body)'
    }
  }, "12 of 28 topics exam-ready. We'll tell you when to book.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 26,
      justifyItems: 'center',
      paddingTop: 8
    }
  }, pathTopics.map((t, i) => /*#__PURE__*/React.createElement(PathNode, {
    key: t.id,
    t: t,
    i: i
  }))));
}
function LessonScreen() {
  const [v, setV] = React.useState('SIPC steps in when a brokerage fails and customer property is short…');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 30px',
      display: 'grid',
      gap: 14,
      alignContent: 'start',
      background: 'var(--surface-page)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    label: "Close",
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 2,
    max: 3,
    height: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--tangerine-600)',
      font: '700 14px var(--font-display)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-flame"
  }), " 7")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--tangerine-600)'
    }
  }, "Your turn \xB7 T004"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '600 24px var(--font-display)',
      color: 'var(--text-body)'
    }
  }, "Explain it to a colleague."), /*#__PURE__*/React.createElement(Card, {
    sunken: true,
    padding: 14
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)',
      font: '700 13px var(--font-body)'
    }
  }, "In short:"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      font: '600 13px var(--font-body)'
    }
  }, " SIPC is for brokerage-firm shortfalls; FDIC is for bank deposits; neither covers market loss.")), /*#__PURE__*/React.createElement(TeachBackBox, {
    value: v,
    onChange: setV,
    rows: 6,
    prompt: "In your own words, explain SIPC vs FDIC\u2014what each protects, the coverage limits, and the important exclusions.",
    placeholder: "Start with the institution each one protects\u2026"
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg"
  }, "Grade my teach-back"));
}
function ResultScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 30px',
      display: 'grid',
      gap: 14,
      alignContent: 'start',
      background: 'var(--surface-page)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      justifyItems: 'center',
      gap: 10,
      padding: '18px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 92,
      height: 92,
      borderRadius: '50%',
      background: 'var(--clover-500)',
      boxShadow: '0 5px 0 var(--clover-700)',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      fontSize: 46
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check-fat"
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '700 28px var(--font-display)',
      color: 'var(--text-body)'
    }
  }, "Exam-Ready!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)',
      font: '600 14px var(--font-body)',
      textAlign: 'center'
    }
  }, "Come back tomorrow to push T004 toward Mastered.")), /*#__PURE__*/React.createElement(ResultBanner, {
    state: "Exam-Ready",
    message: "That explanation is exam-ready!"
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "2px 18px"
  }, /*#__PURE__*/React.createElement(CriterionRow, {
    outcome: "hit",
    label: "SIPC covers brokerage failure",
    feedback: "Clearly stated with the shortfall mechanics."
  }), /*#__PURE__*/React.createElement(CriterionRow, {
    outcome: "hit",
    label: "Coverage limits",
    feedback: "Both figures landed."
  }), /*#__PURE__*/React.createElement(CriterionRow, {
    outcome: "partial",
    label: "Market losses excluded",
    feedback: "Implied, but say it outright next time."
  })), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    variant: "accent"
  }, "Continue"));
}
window.TBAppScreens = {
  HomeScreen,
  LessonScreen,
  ResultScreen
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/data.js
try { (() => {
window.TB_TOPICS = [{
  id: 'T004',
  title: 'SIPC vs FDIC',
  subtitle: 'What each protects, coverage limits and exclusions',
  section: '1.1 Regulatory entities',
  read: '4 min',
  inShort: ['SIPC is for brokerage-firm shortfalls', 'FDIC is for bank deposits', 'Neither covers market loss'],
  core: ['SIPC and FDIC are backstops for different financial-institution failures. SIPC applies to brokerage firms; FDIC applies to insured banks. Neither one protects you when an investment loses value in the market.'],
  precision: ['SIPC: $500,000 per customer, including no more than $250,000 for cash claims — limits on a shortfall advance.', 'FDIC: $250,000 per depositor, per insured bank, per ownership category.', 'SIPC protects net equity; a margin debit reduces the claim.'],
  prompt: 'In your own words, explain SIPC vs FDIC—what each protects, the coverage limits, and the important exclusions.',
  placeholder: 'Start with the institution each one protects…',
  criteria: [{
    id: 'c1',
    label: 'SIPC covers brokerage failure',
    keys: ['sipc', 'broker'],
    fb: {
      hit: 'Clearly stated with the shortfall mechanics.',
      miss: 'Say which institution SIPC backstops.'
    }
  }, {
    id: 'c2',
    label: 'FDIC covers bank deposits',
    keys: ['fdic', 'bank'],
    fb: {
      hit: 'Right layer — insured bank deposits.',
      miss: 'FDIC protects deposits at insured banks.'
    }
  }, {
    id: 'c3',
    label: 'Coverage limits',
    keys: ['500', '250'],
    fb: {
      hit: 'Both figures landed.',
      miss: 'Give the $500,000 / $250,000 figures.'
    }
  }, {
    id: 'c4',
    label: 'Market losses excluded',
    keys: ['market', 'loss'],
    fb: {
      hit: 'Neither backstop covers market loss — exactly.',
      miss: 'Neither one covers an investment losing value.'
    }
  }]
}, {
  id: 'T005',
  title: 'Investor categories',
  subtitle: 'Retail, accredited and institutional',
  section: '1.4 Market participants',
  read: '5 min',
  inShort: ['Protection scales down as sophistication scales up', 'Accredited: income or net-worth thresholds', 'Institutional: entities, not individuals'],
  core: ['Retail, accredited and institutional investors differ in the protection the rules assume they need. Access to private placements is gated by category.'],
  precision: ['Accredited: $200k income ($300k joint) for two years, or $1M net worth excluding primary residence.', 'Institutional investors are entities — banks, funds, plans.', 'Category changes disclosure, not the quality of the deal.'],
  prompt: 'In your own words, compare retail, accredited, and institutional investors, including the key dollar thresholds and private-placement gates.',
  placeholder: 'Start with how protection and access change by investor category…',
  criteria: [{
    id: 'c1',
    label: 'Three categories distinguished',
    keys: ['retail', 'accredited'],
    fb: {
      hit: 'All three categories placed.',
      miss: 'Name and separate the three categories.'
    }
  }, {
    id: 'c2',
    label: 'Accredited thresholds',
    keys: ['200', '1m|million|net worth'],
    fb: {
      hit: 'Thresholds stated.',
      miss: 'Give the income / net-worth thresholds.'
    }
  }, {
    id: 'c3',
    label: 'Private-placement gate',
    keys: ['private'],
    fb: {
      hit: 'Access gating explained.',
      miss: 'Say what accreditation unlocks.'
    }
  }]
}, {
  id: 'T010',
  title: 'Primary vs secondary market',
  subtitle: 'Follow the money',
  section: '1.2 Market structure',
  read: '4 min',
  inShort: ['Primary: proceeds go to the issuer', 'Secondary: investors trade among themselves', 'Dilution only when new shares are created'],
  core: ['Primary-market transactions send proceeds to the issuer; secondary-market trades move existing shares between investors. IPOs and follow-ons are primary; a secondary offering sells existing holders\u2019 shares.'],
  precision: ['Follow the money: issuer receives proceeds → primary.', 'Follow-on offerings create new shares and dilute.', 'Secondary offerings do not raise capital for the issuer.'],
  prompt: 'In your own words, distinguish primary from secondary markets by following the money, then explain IPOs, follow-ons, secondary offerings, and dilution.',
  placeholder: 'Start with who receives the proceeds…',
  criteria: [{
    id: 'c1',
    label: 'Proceeds define the market',
    keys: ['issuer', 'proceeds'],
    fb: {
      hit: 'Followed the money correctly.',
      miss: 'Say who receives the proceeds in each market.'
    }
  }, {
    id: 'c2',
    label: 'IPO vs follow-on',
    keys: ['ipo'],
    fb: {
      hit: 'Offering types placed.',
      miss: 'Place IPOs and follow-ons on the primary side.'
    }
  }, {
    id: 'c3',
    label: 'Dilution mechanics',
    keys: ['dilut'],
    fb: {
      hit: 'Dilution tied to new shares.',
      miss: 'Dilution happens only when new shares are created.'
    }
  }]
}];
window.TB_STATES = ['Unassessed', 'Gap', 'Misconception', 'Rusty', 'Exam-Ready', 'Mastered'];
window.TB_STATE_DESC = {
  Unassessed: 'No teach-back graded yet',
  Gap: 'The core mechanism was absent',
  Misconception: 'A rule was stated incorrectly',
  Rusty: 'Some correct pieces, but not enough coverage',
  'Exam-Ready': 'The explanation meets the current tier',
  Mastered: 'Confirmed across separate days — come back tomorrow'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/data.js", error: String((e && e.message) || e) }); }

// ui_kits/web/screens.jsx
try { (() => {
const {
  Button,
  IconButton,
  Card,
  StateBadge,
  ProgressBar,
  StreakBadge,
  TeachBackBox,
  TopicChip,
  CriterionRow,
  ResultBanner
} = window.TeachbackDesignSystem_417209;
const STORE = 'tb-ds-web-kit:v1';
function grade(topic, answer) {
  const a = answer.toLowerCase();
  const crits = topic.criteria.map(c => {
    const hits = c.keys.filter(k => k.split('|').some(alt => a.includes(alt))).length;
    const outcome = hits === c.keys.length ? 'hit' : hits > 0 ? 'partial' : 'missing';
    return {
      ...c,
      outcome,
      feedback: outcome === 'hit' ? c.fb.hit : c.fb.miss
    };
  });
  const n = crits.filter(c => c.outcome === 'hit').length;
  const state = n === crits.length ? 'Exam-Ready' : n >= Math.ceil(crits.length / 2) ? 'Rusty' : 'Gap';
  return {
    crits,
    state
  };
}
function StatePath({
  state
}) {
  const idx = window.TB_STATES.indexOf(state);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      flex: 1,
      minWidth: 280
    }
  }, window.TB_STATES.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: s
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      background: i <= idx ? 'var(--clover-500)' : 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    title: s,
    style: {
      display: 'grid',
      gap: 4,
      justifyItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: i === idx ? 26 : 18,
      height: i === idx ? 26 : 18,
      borderRadius: '50%',
      background: i < idx ? 'var(--clover-500)' : i === idx ? `var(--state-${s.toLowerCase().replace('-', '')})` : 'var(--surface-sunken)',
      border: '1px solid ' + (i <= idx ? 'transparent' : 'var(--border-strong)'),
      boxShadow: i === idx ? '0 2px 0 rgba(0,0,0,.18)' : 'none',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      fontSize: 12
    }
  }, i < idx && /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 9px var(--font-body)',
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      color: i === idx ? 'var(--text-body)' : 'var(--text-faint)',
      whiteSpace: 'nowrap'
    }
  }, s)))));
}
function TopBar({
  streak
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      maxWidth: 'var(--page-max)',
      margin: 'auto',
      padding: '18px var(--page-pad)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: '700 26px var(--font-display)',
      color: 'var(--text-body)',
      textDecoration: 'none',
      letterSpacing: '-.02em'
    }
  }, "teach", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--clover-500)'
    }
  }, "back")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StreakBadge, {
    count: streak
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "gear",
    label: "Settings"
  })));
}
function NoteCard({
  topic
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: 30
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      paddingBottom: 18,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-mono)',
      color: 'var(--tangerine-600)'
    }
  }, topic.id, " \xB7 ", topic.section), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 3px',
      font: '600 28px var(--font-display)',
      color: 'var(--text-body)'
    }
  }, topic.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)',
      font: '600 14px var(--font-body)'
    }
  }, topic.subtitle)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-mono)',
      color: 'var(--text-faint)',
      whiteSpace: 'nowrap',
      paddingTop: 4
    }
  }, topic.read)), /*#__PURE__*/React.createElement(Card, {
    sunken: true,
    padding: 16,
    style: {
      margin: '18px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--tangerine-600)'
    }
  }, "In short"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 6,
      marginTop: 8
    }
  }, topic.inShort.map(p => /*#__PURE__*/React.createElement("strong", {
    key: p,
    style: {
      color: 'var(--text-body)',
      font: '700 14px var(--font-body)'
    }
  }, p)))), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--clover-600)'
    }
  }, "Core"), topic.core.map(p => /*#__PURE__*/React.createElement("p", {
    key: p,
    style: {
      margin: '0 0 12px',
      color: 'var(--text-muted)',
      font: '600 14px/1.7 var(--font-body)'
    }
  }, p)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '16px 0 8px',
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--clover-600)'
    }
  }, "Precision"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 8
    }
  }, topic.precision.map(p => /*#__PURE__*/React.createElement("li", {
    key: p,
    style: {
      position: 'relative',
      paddingLeft: 22,
      color: 'var(--text-muted)',
      font: '600 13px/1.55 var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-arrow-fat-right",
    style: {
      position: 'absolute',
      left: 0,
      top: 2,
      color: 'var(--tangerine-500)'
    }
  }), p))));
}
function App() {
  const saved = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(STORE)) || {};
    } catch {
      return {};
    }
  }, []);
  const [topicId, setTopicId] = React.useState(saved.topicId || 'T004');
  const [answers, setAnswers] = React.useState(saved.answers || {});
  const [results, setResults] = React.useState(saved.results || {});
  const topic = window.TB_TOPICS.find(t => t.id === topicId);
  const answer = answers[topicId] || '';
  const result = results[topicId];
  const [err, setErr] = React.useState('');
  const persist = patch => {
    try {
      localStorage.setItem(STORE, JSON.stringify({
        topicId,
        answers,
        results,
        ...patch
      }));
    } catch {}
  };
  const submit = () => {
    if (answer.trim().length < 20) {
      setErr('Write at least a couple of sentences so the rubric has something to assess.');
      return;
    }
    setErr('');
    const r = grade(topic, answer);
    const nextResults = {
      ...results,
      [topicId]: r
    };
    setResults(nextResults);
    persist({
      results: nextResults
    });
  };
  const pick = id => {
    setTopicId(id);
    setErr('');
    persist({
      topicId: id
    });
  };
  const setAnswer = v => {
    const na = {
      ...answers,
      [topicId]: v
    };
    setAnswers(na);
    persist({
      answers: na
    });
  };
  const stateOf = id => results[id] ? results[id].state : 'Unassessed';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    streak: 7
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: 'auto',
      padding: '26px var(--page-pad) 80px',
      display: 'grid',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--text-hero)',
      fontFamily: 'var(--font-display)',
      color: 'var(--text-body)',
      letterSpacing: 'var(--tracking-display)'
    }
  }, "Learn it. ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--clover-500)',
      fontStyle: 'normal'
    }
  }, "Teach it back.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 520,
      color: 'var(--text-muted)',
      font: 'var(--text-body-lg)'
    }
  }, "Read a focused note, explain it in your own words, and get an honest signal for what to revisit."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, window.TB_TOPICS.map(t => /*#__PURE__*/React.createElement(TopicChip, {
    key: t.id,
    id: t.id,
    title: t.title,
    state: stateOf(t.id),
    selected: t.id === topicId,
    onClick: () => pick(t.id)
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: 20,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Your topic state"), /*#__PURE__*/React.createElement(StateBadge, {
    state: stateOf(topicId)
  })), /*#__PURE__*/React.createElement(StatePath, {
    state: stateOf(topicId)
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)',
      font: '600 12px var(--font-body)',
      maxWidth: 180
    }
  }, window.TB_STATE_DESC[stateOf(topicId)])), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.05fr) minmax(340px,.8fr)',
      gap: 22,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(NoteCard, {
    topic: topic
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 24
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--tangerine-600)'
    }
  }, "Your turn \xB7 ", topic.id), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 14px',
      font: '600 24px var(--font-display)',
      color: 'var(--text-body)'
    }
  }, "Explain it to a colleague."), /*#__PURE__*/React.createElement(TeachBackBox, {
    value: answer,
    onChange: setAnswer,
    prompt: topic.prompt,
    placeholder: topic.placeholder,
    rows: 8
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    onClick: submit
  }, "Grade my teach-back")), err && /*#__PURE__*/React.createElement("p", {
    role: "alert",
    style: {
      margin: '10px 0 0',
      color: 'var(--coral-700)',
      font: '600 12px var(--font-body)'
    }
  }, err), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      font: '500 10px var(--font-mono)',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-sparkle",
    style: {
      color: 'var(--tangerine-500)'
    }
  }), " Local deterministic grader \xB7 no API key required")), result ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ResultBanner, {
    state: result.state
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "4px 22px"
  }, result.crits.map(c => /*#__PURE__*/React.createElement(CriterionRow, {
    key: c.id,
    outcome: c.outcome,
    label: c.label,
    feedback: c.feedback
  })))) : /*#__PURE__*/React.createElement(Card, {
    sunken: true,
    padding: 26,
    style: {
      border: '1px dashed var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-arrow-elbow-down-right",
    style: {
      fontSize: 26,
      color: 'var(--tangerine-500)'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '10px 0 6px',
      font: '600 20px var(--font-display)',
      color: 'var(--text-body)'
    }
  }, "Your signal will appear here."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)',
      font: '600 13px/1.6 var(--font-body)',
      maxWidth: 300
    }
  }, "We'll compare your explanation with the ", topic.criteria.length, " things an exam-ready answer needs to make clear."))))), /*#__PURE__*/React.createElement("footer", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: 'auto',
      padding: '0 var(--page-pad) 30px',
      font: '500 11px var(--font-mono)',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--tangerine-600)'
    }
  }, "Explanation first."), " Three topics, one loop, one honest signal."));
}
window.TBWebApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StateBadge = __ds_scope.StateBadge;

__ds_ns.StreakBadge = __ds_scope.StreakBadge;

__ds_ns.CriterionRow = __ds_scope.CriterionRow;

__ds_ns.ResultBanner = __ds_scope.ResultBanner;

__ds_ns.TeachBackBox = __ds_scope.TeachBackBox;

__ds_ns.TopicChip = __ds_scope.TopicChip;

})();
