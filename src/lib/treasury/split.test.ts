import assert from 'node:assert/strict';
import test from 'node:test';

import { splitSpend } from './split';
import { RULE_PRESETS, SCENARIO, VAULT_RULES } from './rules';

const sum = (values: readonly number[]): number => values.reduce((total, value) => total + value, 0);

test('the scene split is the published split', () => {
  const result = splitSpend(SCENARIO.amountIdr);
  assert.deepEqual(
    result.lines.map((line) => [line.id, line.amountIdr]),
    [
      ['tax', 96000],
      ['ops', 216000],
      ['yield', 120000],
      ['payroll', 48000],
    ],
  );
});

test('lines always sum to the charge', () => {
  const totals = [0, 1, 3, 7, 99, 101, 1000, 479_999, 480_000, 1_000_001];
  for (let value = 0; value <= 2000; value += 1) totals.push(value);

  for (const total of totals) {
    const result = splitSpend(total);
    assert.equal(sum(result.lines.map((line) => line.amountIdr)), total, `total ${total}`);
    assert.equal(result.totalIdr, total);
  }
});

test('nothing is allocated beyond the charge', () => {
  for (let total = 0; total <= 5000; total += 1) {
    for (const line of splitSpend(total).lines) {
      assert.ok(line.amountIdr >= 0, `negative line at ${total}`);
      assert.ok(line.amountIdr <= total, `line exceeds total at ${total}`);
    }
  }
});

test('a zero charge allocates nothing', () => {
  const result = splitSpend(0);
  assert.equal(sum(result.lines.map((line) => line.amountIdr)), 0);
});

test('the rule set is exact to 100 percent', () => {
  assert.equal(sum(VAULT_RULES.map((rule) => rule.sharePct)), 100);
});

test('all rule presets sum to 100 percent and split cleanly', () => {
  for (const preset of RULE_PRESETS) {
    assert.equal(
      sum(preset.rules.map((rule) => rule.sharePct)),
      100,
      `preset ${preset.id}`,
    );
    for (const total of [0, 1, 479_999, 480_000, 1_000_000]) {
      const result = splitSpend(total, preset.rules);
      assert.equal(
        sum(result.lines.map((line) => line.amountIdr)),
        total,
        `${preset.id} at ${total}`,
      );
    }
  }
});
