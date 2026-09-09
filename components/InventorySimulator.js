'use client';

import { useMemo, useState } from 'react';

// Deterministic starting stock — randomized values here would mismatch
// between server and client render and trip a hydration error (the same
// bug fixed in ParkingSimulator).
const SKUS = [
  { id: 'sku-1', name: 'Running Shoe — Size 9', reorderAt: 8 },
  { id: 'sku-2', name: 'Wireless Earbuds', reorderAt: 6 },
  { id: 'sku-3', name: 'Insulated Water Bottle', reorderAt: 10 },
];

const WAREHOUSES = ['Warehouse A', 'Warehouse B', 'Warehouse C'];

const INITIAL_STOCK = {
  'sku-1': [14, 3, 9],
  'sku-2': [2, 11, 4],
  'sku-3': [18, 6, 2],
};

export default function InventorySimulator() {
  const [stock, setStock] = useState(INITIAL_STOCK);

  const networkTotals = useMemo(() => {
    const totals = {};
    for (const sku of SKUS) totals[sku.id] = stock[sku.id].reduce((a, b) => a + b, 0);
    return totals;
  }, [stock]);

  // The actual transfer-suggestion logic: if one location is below its
  // reorder threshold while another location holds a meaningful surplus of
  // the same SKU, suggest moving units instead of opening a new PO.
  const suggestions = useMemo(() => {
    const list = [];
    for (const sku of SKUS) {
      const levels = stock[sku.id];
      const low = levels
        .map((qty, i) => ({ i, qty }))
        .filter((w) => w.qty < sku.reorderAt);
      if (low.length === 0) continue;
      for (const shortfall of low) {
        const surplus = levels
          .map((qty, i) => ({ i, qty }))
          .filter((w) => w.i !== shortfall.i && w.qty > sku.reorderAt * 1.5)
          .sort((a, b) => b.qty - a.qty)[0];
        if (surplus) {
          const moveQty = Math.min(4, Math.floor((surplus.qty - sku.reorderAt) / 2));
          if (moveQty > 0) {
            list.push({
              sku: sku.name,
              from: WAREHOUSES[surplus.i],
              to: WAREHOUSES[shortfall.i],
              qty: moveQty,
            });
          }
        }
      }
    }
    return list;
  }, [stock]);

  function sellOne(skuId, warehouseIndex) {
    setStock((prev) => {
      const next = { ...prev, [skuId]: [...prev[skuId]] };
      next[skuId][warehouseIndex] = Math.max(0, next[skuId][warehouseIndex] - 1);
      return next;
    });
  }

  function applyTransfer(suggestion) {
    setStock((prev) => {
      const skuId = SKUS.find((s) => s.name === suggestion.sku)?.id;
      if (!skuId) return prev;
      const fromIdx = WAREHOUSES.indexOf(suggestion.from);
      const toIdx = WAREHOUSES.indexOf(suggestion.to);
      const next = { ...prev, [skuId]: [...prev[skuId]] };
      next[skuId][fromIdx] = Math.max(0, next[skuId][fromIdx] - suggestion.qty);
      next[skuId][toIdx] = next[skuId][toIdx] + suggestion.qty;
      return next;
    });
  }

  function resetStock() {
    setStock(INITIAL_STOCK);
  }

  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 16, padding: 'clamp(20px, 4vw, 36px)', background: 'var(--bg-raised)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <p className="eyebrow" style={{ margin: 0 }}>Live inventory ledger</p>
        <button type="button" onClick={resetStock} className="btn btn-ghost" style={{ fontSize: 13, padding: '10px 18px' }}>
          Reset stock
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontSize: 12.5, color: 'var(--ink-faint)', fontWeight: 600, padding: '0 0 12px', borderBottom: '1px solid var(--line)' }}>SKU</th>
              {WAREHOUSES.map((w) => (
                <th key={w} style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--ink-faint)', fontWeight: 600, padding: '0 8px 12px', borderBottom: '1px solid var(--line)' }}>{w}</th>
              ))}
              <th style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--ink-faint)', fontWeight: 600, padding: '0 0 12px', borderBottom: '1px solid var(--line)' }}>Network Total</th>
            </tr>
          </thead>
          <tbody>
            {SKUS.map((sku) => (
              <tr key={sku.id}>
                <td style={{ padding: '16px 0', fontSize: 14, color: 'var(--ink)', borderBottom: '1px solid var(--line)' }}>{sku.name}</td>
                {WAREHOUSES.map((w, i) => {
                  const qty = stock[sku.id][i];
                  const low = qty < sku.reorderAt;
                  return (
                    <td key={w} style={{ textAlign: 'center', padding: '16px 8px', borderBottom: '1px solid var(--line)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20, color: low ? 'var(--accent-bright)' : 'var(--ink)' }}>
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => sellOne(sku.id, i)}
                          disabled={qty === 0}
                          className="btn btn-ghost"
                          style={{ fontSize: 11.5, padding: '6px 12px', opacity: qty === 0 ? 0.4 : 1 }}
                        >
                          Sell 1
                        </button>
                      </div>
                    </td>
                  );
                })}
                <td style={{ textAlign: 'center', padding: '16px 0', fontSize: 15, fontWeight: 700, color: 'var(--ink)', borderBottom: '1px solid var(--line)' }}>
                  {networkTotals[sku.id]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 26 }}>
        <p style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginBottom: 12 }}>
          Suggested transfers {suggestions.length === 0 && '— none right now, every location is above its reorder threshold'}
        </p>
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10,
              border: '1px solid var(--line-strong)', borderRadius: 10, padding: '12px 16px', marginBottom: 8,
              background: 'rgba(178,58,87,0.08)',
            }}
          >
            <span className="body" style={{ margin: 0, fontSize: 13.5 }}>
              Move <strong style={{ color: 'var(--ink)' }}>{s.qty} units</strong> of {s.sku}: {s.from} → {s.to}
            </span>
            <button type="button" onClick={() => applyTransfer(s)} className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>
              Apply transfer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
