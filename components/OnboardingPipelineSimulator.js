'use client';

import { useEffect, useRef, useState } from 'react';

const STAGES = ['Uploaded', 'OCR Extraction', 'Validation Checks', 'Risk Scoring', 'Decision'];

const SCENARIOS = {
  clean: {
    label: 'Submit a matching, unexpired ID',
    checks: [
      { name: 'Name on ID matches application', pass: true },
      { name: 'Document not expired', pass: true },
      { name: 'Photo matches selfie capture', pass: true },
    ],
    confidence: 96,
    outcome: 'approved',
  },
  mismatch: {
    label: 'Submit an ID with a name mismatch',
    checks: [
      { name: 'Name on ID matches application', pass: false, detail: '"Jon Smith" on ID vs. "John Smith" on application' },
      { name: 'Document not expired', pass: true },
      { name: 'Photo matches selfie capture', pass: true },
    ],
    confidence: 54,
    outcome: 'flagged',
  },
};

const STAGE_DELAY_MS = 550;

export default function OnboardingPipelineSimulator() {
  const [stageIndex, setStageIndex] = useState(-1); // -1 = idle
  const [scenario, setScenario] = useState(null);
  const [processedCount, setProcessedCount] = useState(0);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  function runScenario(key) {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setScenario(SCENARIOS[key]);
    setStageIndex(0);

    STAGES.slice(1).forEach((_, i) => {
      const t = setTimeout(() => setStageIndex(i + 1), STAGE_DELAY_MS * (i + 1));
      timeoutsRef.current.push(t);
    });

    const finalTimeout = setTimeout(() => {
      setProcessedCount((c) => c + 1);
    }, STAGE_DELAY_MS * STAGES.length);
    timeoutsRef.current.push(finalTimeout);
  }

  const isRunning = stageIndex >= 0 && stageIndex < STAGES.length - 1;
  const isDone = stageIndex === STAGES.length - 1;

  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 16, padding: 'clamp(20px, 4vw, 36px)', background: 'var(--bg-raised)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <p className="eyebrow" style={{ margin: 0 }}>Live onboarding pipeline</p>
        <span className="body" style={{ margin: 0, fontSize: 13 }}>{processedCount} submission{processedCount === 1 ? '' : 's'} processed this session</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 30 }}>
        <button type="button" onClick={() => runScenario('clean')} disabled={isRunning} className="btn btn-primary" style={{ fontSize: 13, padding: '11px 20px', opacity: isRunning ? 0.6 : 1 }}>
          {SCENARIOS.clean.label}
        </button>
        <button type="button" onClick={() => runScenario('mismatch')} disabled={isRunning} className="btn btn-ghost" style={{ fontSize: 13, padding: '11px 20px', opacity: isRunning ? 0.6 : 1 }}>
          {SCENARIOS.mismatch.label}
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {STAGES.map((stage, i) => {
          const reached = stageIndex >= i;
          const active = stageIndex === i && !isDone;
          return (
            <div
              key={stage}
              style={{
                flex: '1 1 140px',
                padding: '12px 14px',
                borderRadius: 8,
                border: `1px solid ${reached ? 'var(--accent-bright)' : 'var(--line)'}`,
                background: reached ? 'rgba(178,58,87,0.1)' : 'transparent',
                fontSize: 12.5,
                color: reached ? 'var(--ink)' : 'var(--ink-faint)',
                textAlign: 'center',
                transition: 'border-color .25s ease, background .25s ease, color .25s ease',
                opacity: active ? 0.75 : 1,
              }}
            >
              {stage}
            </div>
          );
        })}
      </div>

      {scenario && (
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24 }}>
          <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginBottom: 14 }}>Validation checks</p>
          {scenario.checks.map((check) => {
            const show = stageIndex >= 2; // revealed once Validation stage is reached
            return (
              <div key={check.name} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, opacity: show ? 1 : 0.25 }}>
                <span style={{ color: check.pass ? '#7fbf8f' : 'var(--accent-bright)', fontSize: 14, lineHeight: '20px' }}>
                  {check.pass ? '✓' : '✕'}
                </span>
                <span className="body" style={{ margin: 0, fontSize: 13.5 }}>
                  {check.name}
                  {!check.pass && check.detail && (
                    <span style={{ display: 'block', color: 'var(--ink-faint)', fontSize: 12.5, marginTop: 2 }}>{check.detail}</span>
                  )}
                </span>
              </div>
            );
          })}

          {isDone && (
            <div
              style={{
                marginTop: 20,
                padding: '16px 18px',
                borderRadius: 10,
                border: `1px solid ${scenario.outcome === 'approved' ? '#7fbf8f' : 'var(--accent-bright)'}`,
                background: scenario.outcome === 'approved' ? 'rgba(127,191,143,0.08)' : 'rgba(178,58,87,0.1)',
              }}
            >
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                {scenario.outcome === 'approved' ? 'Auto-approved' : 'Flagged for manual review'} — confidence score {scenario.confidence}%
              </p>
              <p className="body" style={{ margin: '6px 0 0', fontSize: 13 }}>
                {scenario.outcome === 'approved'
                  ? 'All checks passed above the auto-approve threshold — no reviewer touches this one.'
                  : 'The specific failed check is routed straight to a reviewer, instead of a generic "please review" queue.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
