'use client';

import { useRef, useState } from 'react';

const PROVIDERS = ['Dr. Patel', 'Dr. Nguyen', 'Dr. Alavi'];
const TIMES = ['9:00', '9:30', '10:00', '10:30', '11:00'];

function buildSlots() {
  const slots = [];
  let id = 0;
  for (const provider of PROVIDERS) {
    for (const time of TIMES) {
      // Fixed, deterministic starting pattern — a few slots pre-booked so
      // the grid doesn't look artificially empty, same booking distribution
      // every load (no Math.random() during initial render).
      const preBooked = (id * 7) % 11 === 0;
      slots.push({ id, provider, time, status: preBooked ? 'booked' : 'open' });
      id += 1;
    }
  }
  return slots;
}

export default function BookingRaceSimulator() {
  const [slots, setSlots] = useState(buildSlots);
  const [log, setLog] = useState([]);
  const lockRef = useRef(new Set());

  function appendLog(entry) {
    setLog((prev) => [entry, ...prev].slice(0, 6));
  }

  // The real logic being demonstrated: acquiring a lock on a slot before
  // confirming a booking. Only the request that wins the lock can book it —
  // everyone else is rejected and pointed at the next open slot, instead of
  // two patients both believing they hold the same appointment.
  function attemptBook(slotId, requester) {
    if (lockRef.current.has(slotId)) {
      const nextOpen = slots.find((s) => s.status === 'open' && s.id !== slotId);
      appendLog(`✕ ${requester} — slot already locked by another request. ${nextOpen ? `Offered ${nextOpen.provider} ${nextOpen.time} instead.` : 'No other open slots.'}`);
      return;
    }
    lockRef.current.add(slotId);
    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, status: 'booked' } : s)));
    const slot = slots.find((s) => s.id === slotId);
    appendLog(`✓ ${requester} — booked ${slot.provider} ${slot.time}.`);
    setTimeout(() => lockRef.current.delete(slotId), 50);
  }

  function bookManually(slotId) {
    attemptBook(slotId, 'You');
  }

  function simulateRace() {
    const open = slots.filter((s) => s.status === 'open');
    if (open.length === 0) {
      appendLog('No open slots left to race for.');
      return;
    }
    const target = open[0];
    appendLog(`— 3 requests racing for ${target.provider} ${target.time} simultaneously —`);
    ['Front desk', 'Patient portal', 'Call center'].forEach((requester, i) => {
      // Deliberately near-simultaneous with tiny jitter, to make three
      // genuinely concurrent attempts land in a non-deterministic order —
      // this is a click-handler timer, not initial render, so it doesn't
      // touch hydration.
      setTimeout(() => attemptBook(target.id, requester), 30 + i * 15);
    });
  }

  function resetSlots() {
    lockRef.current = new Set();
    setSlots(buildSlots());
    setLog([]);
  }

  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 16, padding: 'clamp(20px, 4vw, 36px)', background: 'var(--bg-raised)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <p className="eyebrow" style={{ margin: 0 }}>Live slot-locking demo</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" onClick={simulateRace} className="btn btn-primary" style={{ fontSize: 13, padding: '11px 20px' }}>
            Simulate 3 concurrent booking attempts
          </button>
          <button type="button" onClick={resetSlots} className="btn btn-ghost" style={{ fontSize: 13, padding: '11px 20px' }}>
            Reset
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontSize: 12.5, color: 'var(--ink-faint)', fontWeight: 600, padding: '0 10px 12px 0', borderBottom: '1px solid var(--line)' }} />
              {TIMES.map((t) => (
                <th key={t} style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--ink-faint)', fontWeight: 600, padding: '0 6px 12px', borderBottom: '1px solid var(--line)' }}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROVIDERS.map((provider) => (
              <tr key={provider}>
                <td style={{ fontSize: 13, color: 'var(--ink)', padding: '10px 10px 10px 0', borderBottom: '1px solid var(--line)', whiteSpace: 'nowrap' }}>{provider}</td>
                {slots.filter((s) => s.provider === provider).map((slot) => (
                  <td key={slot.id} style={{ padding: '8px 6px', borderBottom: '1px solid var(--line)', textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => bookManually(slot.id)}
                      disabled={slot.status === 'booked'}
                      style={{
                        width: '100%',
                        minWidth: 64,
                        padding: '9px 6px',
                        borderRadius: 8,
                        fontSize: 11.5,
                        border: `1px solid ${slot.status === 'booked' ? 'var(--ink-faint)' : 'var(--line-strong)'}`,
                        background: slot.status === 'booked' ? 'var(--ink-faint)' : 'transparent',
                        color: slot.status === 'booked' ? 'var(--bg)' : 'var(--ink-dim)',
                        cursor: slot.status === 'booked' ? 'default' : 'pointer',
                      }}
                    >
                      {slot.status === 'booked' ? 'Booked' : 'Open'}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginBottom: 10 }}>Activity log</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 24 }}>
          {log.length === 0 && <span className="body" style={{ margin: 0, fontSize: 13 }}>Click an open slot, or run the concurrent-booking demo above.</span>}
          {log.map((entry, i) => (
            <span key={i} className="body" style={{ margin: 0, fontSize: 13, color: entry.startsWith('✓') ? '#7fbf8f' : entry.startsWith('✕') ? 'var(--accent-bright)' : 'var(--ink-faint)' }}>
              {entry}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
