'use client';

import { useMemo, useState } from 'react';

// Base ranges match the published table in
// /blog/how-much-does-custom-software-cost exactly — this tool is a
// transparent calculator built from that already-public content, not a
// separate set of numbers. Multipliers are reasonable, stated
// transformations of the same article's own reasoning (integrations,
// design complexity and compressed timelines all raise cost), not new
// unverified figures.
const PROJECT_TYPES = [
  { id: 'internal', label: 'Internal tool / single-purpose app', low: 8000, high: 25000, weeksLow: 4, weeksHigh: 8 },
  { id: 'website', label: 'Business website with custom features', low: 10000, high: 35000, weeksLow: 6, weeksHigh: 10 },
  { id: 'mvp', label: 'MVP for a startup product', low: 20000, high: 60000, weeksLow: 8, weeksHigh: 14 },
  { id: 'platform', label: 'Multi-feature platform with integrations', low: 50000, high: 150000, weeksLow: 12, weeksHigh: 26 },
];

const INTEGRATIONS = [
  { id: 'none', label: 'None', mult: 1 },
  { id: 'few', label: '1–2 integrations', mult: 1.15 },
  { id: 'many', label: '3+ integrations', mult: 1.35 },
];

const DESIGN = [
  { id: 'simple', label: 'Simple / internal-facing', mult: 1 },
  { id: 'custom', label: 'Custom-branded, consumer-facing', mult: 1.2 },
];

const TIMELINE = [
  { id: 'standard', label: 'Standard timeline', mult: 1 },
  { id: 'compressed', label: 'Compressed / rushed', mult: 1.25 },
];

function fmt(n) {
  const rounded = Math.round(n / 500) * 500;
  return '$' + rounded.toLocaleString('en-US');
}

export default function CostCalculator() {
  const [type, setType] = useState('website');
  const [integrations, setIntegrations] = useState('none');
  const [design, setDesign] = useState('simple');
  const [timeline, setTimeline] = useState('standard');

  const result = useMemo(() => {
    const base = PROJECT_TYPES.find((p) => p.id === type);
    const im = INTEGRATIONS.find((i) => i.id === integrations).mult;
    const dm = DESIGN.find((d) => d.id === design).mult;
    const tm = TIMELINE.find((t) => t.id === timeline).mult;
    const mult = im * dm * tm;
    return {
      low: base.low * mult,
      high: base.high * mult,
      weeksLow: Math.round(base.weeksLow * (timeline === 'compressed' ? 0.8 : 1)),
      weeksHigh: Math.round(base.weeksHigh * (timeline === 'compressed' ? 0.85 : 1)),
    };
  }, [type, integrations, design, timeline]);

  const Group = ({ label, options, value, onChange }) => (
    <div style={{ marginBottom: 28 }}>
      <p className="eyebrow" style={{ marginBottom: 14 }}>{label}</p>
      <div className="discovery-options" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {options.map((opt) => (
          <button
            type="button"
            key={opt.id}
            className={'discovery-opt' + (value === opt.id ? ' selected' : '')}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="calc-wrap">
      <Group label="What are you building?" options={PROJECT_TYPES} value={type} onChange={setType} />
      <Group label="How many third-party integrations?" options={INTEGRATIONS} value={integrations} onChange={setIntegrations} />
      <Group label="Design complexity" options={DESIGN} value={design} onChange={setDesign} />
      <Group label="Timeline" options={TIMELINE} value={timeline} onChange={setTimeline} />

      <div className="calc-result reveal">
        <p className="eyebrow" style={{ marginBottom: 10 }}>Estimated range</p>
        <p className="calc-range">{fmt(result.low)} – {fmt(result.high)}</p>
        <p className="calc-timeline">{result.weeksLow}–{result.weeksHigh} weeks, typically</p>
        <p className="body" style={{ marginTop: 18, maxWidth: '56ch' }}>
          This is a starting estimate based on the ranges in our{' '}
          <a href="/blog/how-much-does-custom-software-cost" style={{ textDecoration: 'underline' }}>cost guide</a>, not a quote — the real number depends on specifics a calculator can&apos;t see. Use it to sanity-check any quote you get, including ours.
        </p>
        <div className="hero-actions" style={{ marginTop: 28 }}>
          <a href="/consultation" className="btn btn-primary magnetic" data-cursor="Open" data-track="cta_cost_calculator_consultation">
            Get an actual number, free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
