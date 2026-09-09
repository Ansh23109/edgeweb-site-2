'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// Mirrors the actual pricing engine described in the case study copy above
// this component: a base rate multiplied by a demand tier derived from live
// occupancy. Recomputed on every state change, exactly like the real system
// recomputes it on every sensor event.
const BASE_RATE = 3;
const PRICE_TIERS = [
  { max: 50, multiplier: 1, label: 'Base rate' },
  { max: 80, multiplier: 1.25, label: 'Elevated demand' },
  { max: 95, multiplier: 1.5, label: 'High demand' },
  { max: 101, multiplier: 1.75, label: 'Peak demand' },
];

const ROWS = 4;
const COLS = 7;
const TOTAL_BAYS = ROWS * COLS;

// Deterministic — used for the server-rendered/pre-hydration paint, so the
// client's first render matches it exactly. Math.random() here would give
// the server and the client different layouts and trip a hydration error.
function buildDeterministicBays() {
  return Array.from({ length: TOTAL_BAYS }, (_, i) => ({
    id: i,
    status: i % 3 === 0 ? 'occupied' : 'available',
  }));
}

// The real randomized starting layout — applied client-side only, in an
// effect that runs after that first matching paint.
function buildRandomBays() {
  return Array.from({ length: TOTAL_BAYS }, (_, i) => ({
    id: i,
    status: Math.random() < 0.35 ? 'occupied' : 'available',
  }));
}

function rateForOccupancy(occupancyPct) {
  const tier = PRICE_TIERS.find((t) => occupancyPct < t.max) || PRICE_TIERS[PRICE_TIERS.length - 1];
  return { rate: +(BASE_RATE * tier.multiplier).toFixed(2), label: tier.label, multiplier: tier.multiplier };
}

export default function ParkingSimulator() {
  const [bays, setBays] = useState(buildDeterministicBays);
  const [liveTraffic, setLiveTraffic] = useState(false);
  const intervalRef = useRef(null);

  // Randomize once the component has mounted (and hydration has already
  // matched against the deterministic server-rendered layout above). This
  // is the standard escape hatch for client-only randomness post-hydration
  // — there's no way to defer it further without reintroducing the exact
  // server/client mismatch this is working around.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBays(buildRandomBays());
  }, []);

  const occupancyPct = useMemo(() => {
    const busy = bays.filter((b) => b.status !== 'available').length;
    return Math.round((busy / TOTAL_BAYS) * 100);
  }, [bays]);

  const pricing = useMemo(() => rateForOccupancy(occupancyPct), [occupancyPct]);

  useEffect(() => {
    if (!liveTraffic) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return undefined;
    }
    intervalRef.current = setInterval(() => {
      setBays((prev) => {
        const candidates = prev
          .map((b, i) => ({ ...b, i }))
          .filter((b) => b.status !== 'reserved');
        if (candidates.length === 0) return prev;
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        const next = [...prev];
        next[pick.i] = { ...next[pick.i], status: pick.status === 'available' ? 'occupied' : 'available' };
        return next;
      });
    }, 900);
    return () => clearInterval(intervalRef.current);
  }, [liveTraffic]);

  function toggleBay(id) {
    setBays((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (b.status === 'available') return { ...b, status: 'reserved' };
        if (b.status === 'reserved') return { ...b, status: 'available' };
        return b; // occupied bays represent real cars — not user-clickable
      })
    );
  }

  const statusColor = {
    available: 'var(--line-strong)',
    occupied: 'var(--ink-faint)',
    reserved: 'var(--accent-bright)',
  };

  return (
    <div
      style={{
        border: '1px solid var(--line)',
        borderRadius: 16,
        padding: 'clamp(20px, 4vw, 36px)',
        background: 'var(--bg-raised)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 28,
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Live pricing engine</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 'clamp(32px,4vw,44px)', color: 'var(--ink)' }}>
              ${pricing.rate.toFixed(2)}
            </span>
            <span className="body" style={{ margin: 0 }}>/ hour · {pricing.label}</span>
          </div>
        </div>

        <div style={{ minWidth: 220, flex: '1 1 220px', maxWidth: 320 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--ink-faint)', marginBottom: 8 }}>
            <span>Occupancy</span>
            <span>{occupancyPct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'var(--line)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${occupancyPct}%`,
                background: 'var(--accent-bright)',
                transition: 'width .4s var(--ease, ease)',
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLiveTraffic((v) => !v)}
          className={liveTraffic ? 'btn btn-primary' : 'btn btn-ghost'}
          style={{ fontSize: 13, padding: '11px 20px', whiteSpace: 'nowrap' }}
        >
          {liveTraffic ? 'Pause live traffic' : 'Simulate live traffic'}
        </button>
      </div>

      <div
        role="group"
        aria-label="Parking bay grid — click an available bay to reserve it"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: 8,
          marginBottom: 22,
        }}
      >
        {bays.map((bay) => (
          <button
            key={bay.id}
            type="button"
            onClick={() => toggleBay(bay.id)}
            disabled={bay.status === 'occupied'}
            aria-label={`Bay ${bay.id + 1}: ${bay.status}`}
            title={`Bay ${bay.id + 1}: ${bay.status}`}
            style={{
              aspectRatio: '1',
              borderRadius: 6,
              border: `1px solid ${statusColor[bay.status]}`,
              background: bay.status === 'reserved' ? 'rgba(178,58,87,0.18)' : 'transparent',
              cursor: bay.status === 'occupied' ? 'default' : 'pointer',
              transition: 'border-color .2s ease, background .2s ease',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {bay.status === 'occupied' && (
              // stylized car glyph — makes "occupied" read at a glance instead
              // of relying on a subtle border-color difference alone
              <svg viewBox="0 0 24 24" width="46%" height="46%" fill="var(--ink-dim)" aria-hidden="true">
                <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6z" />
                <circle cx="7.5" cy="15.5" r="1.3" fill="var(--bg-raised)" />
                <circle cx="16.5" cy="15.5" r="1.3" fill="var(--bg-raised)" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 12.5, color: 'var(--ink-faint)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, border: `1px solid ${statusColor.available}`, display: 'inline-block' }} />
          Available — click to reserve
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, border: `1px solid ${statusColor.occupied}`, display: 'inline-block' }} />
          Occupied (live sensor)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, border: `1px solid ${statusColor.reserved}`, background: 'rgba(178,58,87,0.18)', display: 'inline-block' }} />
          Reserved by you — click to release
        </span>
      </div>
    </div>
  );
}
