import test from 'node:test';
import assert from 'node:assert/strict';
import {safeReturnTo} from '../lib/safe-redirect.ts';
const fallback='/fr/espace-famille';
test('reject external, encoded, malformed and control-character destinations',()=>{
 for (const path of ['https://evil.example','//evil.example','/\\evil.example','/%2f%2fevil.example','/x\n//evil.example','/%E0%A4%A',null]) assert.equal(safeReturnTo(path,fallback),fallback);
});
test('retain legitimate local search parameters',()=>{
 assert.equal(safeReturnTo('/fr/garderies?ville=Mirabel',fallback),'/fr/garderies?ville=Mirabel');
});
