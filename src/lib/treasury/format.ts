const idrCurrency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const idrPlain = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

/** Rp 480.000 */
export function formatIdr(amountIdr: number): string {
  return idrCurrency.format(amountIdr);
}

/** Rp 480k — for receipt rows and dense figures. */
export function formatIdrCompact(amountIdr: number): string {
  if (amountIdr === 0) {
    return 'Rp 0';
  }
  if (amountIdr % 1000 === 0) {
    return `Rp ${idrPlain.format(amountIdr / 1000)}k`;
  }
  return formatIdr(amountIdr);
}

/** 480,000 — for input labels and aria text. */
export function formatNumber(amountIdr: number): string {
  return idrPlain.format(amountIdr);
}
