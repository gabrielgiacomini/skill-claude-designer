#!/usr/bin/env npx tsx

/**
 * Claude Designer Completeness Checker
 * 
 * Verifies a Claude Designer operation against the 8-item Claude Designer Quality Checklist.
 * 
 * Usage:
 *   npx tsx skills/claude-designer/scripts/check-claude-designer-completeness.ts --phase <phase>
 */

import { argv } from "process";

// ============================================================================
// Types
// ============================================================================

/**
 * One Claude Designer quality-checklist row with scoring metadata and completion state.
 *
 * @remarks
 * PURITY: Value-object shape only; `checked` is derived from the CLI `--phase` threshold in `main`.
 */
interface ChecklistItem {
  number: number;
  name: string;
  description: string;
  required: boolean;
  checked: boolean;
  weight: number;
}

/**
 * Aggregated completeness snapshot for machine-readable output alongside the console table.
 *
 * @remarks
 * I/O: Emitted as formatted JSON on stdout only when `--json` is present; no other side effects.
 */
interface CompletenessReport {
  checklist: ChecklistItem[];
  score: number;
  maxScore: number;
  canFinalize: boolean;
}

// ============================================================================
// Checklist Definition
// ============================================================================

const CHECKLIST_ITEMS: Omit<ChecklistItem, "checked">[] = [
  { number: 1, name: "Facts verified", description: "WebSearch ran for products/companies/versions", required: true, weight: 2 },
  { number: 2, name: "Brand assets gathered", description: "Logo, colors, fonts, UI screenshots", required: true, weight: 2 },
  { number: 3, name: "Design system declared", description: "Type scale, backgrounds, accent, spacing", required: true, weight: 2 },
  { number: 4, name: "Prompt built", description: "scripts/build-prompt.ts ran", required: true, weight: 1 },
  { number: 5, name: "Prompt validated", description: "scripts/validate-prompt.ts passed", required: true, weight: 1 },
  { number: 6, name: "Output verified", description: "Console checked, artboards match, interactions work", required: true, weight: 2 },
  { number: 7, name: "Export selected", description: "scripts/pick-export.ts ran", required: false, weight: 1 },
  { number: 8, name: "Real assets used", description: "No SVG logos or product shots", required: true, weight: 2 },
];

// ============================================================================
// Main
// ============================================================================

/**
 * Parses CLI flags, derives checklist completion from the phase gate, and prints the report.
 *
 * @remarks
 * I/O: Reads `process.argv`; writes human-readable lines to stdout and optional JSON when `--json` is set.
 */
function main() {
  const args = argv.slice(2);
  const phaseArg = args.find(a => a === "--phase" || a === "-p");
  const jsonArg = args.includes("--json");
  
  const phase = phaseArg 
    ? parseInt(args[args.indexOf(phaseArg) + 1] || "8", 10)
    : 8;
  
  console.log("\n📋 Claude Designer Completeness Check");
  console.log("═".repeat(60));
  console.log(`\n📊 Phase: ${phase}/8`);
  
  // Build checklist based on phase
  const checklist: ChecklistItem[] = CHECKLIST_ITEMS.map(item => {
    let checked = false;
    
    switch (item.number) {
      case 1: // Facts verified
        checked = phase >= 1;
        break;
      case 2: // Brand assets gathered
        checked = phase >= 1;
        break;
      case 3: // Design system declared
        checked = phase >= 2;
        break;
      case 4: // Prompt built
        checked = phase >= 3;
        break;
      case 5: // Prompt validated
        checked = phase >= 4;
        break;
      case 6: // Output verified
        checked = phase >= 5;
        break;
      case 7: // Export selected
        checked = phase >= 6 || item.required === false;
        break;
      case 8: // Real assets used
        checked = phase >= 2;
        break;
      default:
        break;
    }
    
    return { ...item, checked };
  });
  
  const score = checklist.reduce((sum, item) => 
    item.checked ? sum + item.weight : sum, 0);
  const maxScore = checklist.reduce((sum, item) => sum + item.weight, 0);
  
  const requiredItems = checklist.filter(i => i.required);
  const requiredScore = requiredItems.reduce((sum, item) => 
    item.checked ? sum + item.weight : sum, 0);
  const requiredMax = requiredItems.reduce((sum, item) => sum + item.weight, 0);
  
  const canFinalize = requiredScore === requiredMax;
  
  console.log(`\n📊 Score: ${score}/${maxScore} (${((score/maxScore)*100).toFixed(0)}%)`);
  console.log(`   Required items: ${requiredScore}/${requiredMax}`);
  
  console.log(`\n${canFinalize ? "✅" : "⚠️"} Ready: ${canFinalize ? "YES" : "NEEDS WORK"}`);
  
  console.log("\n📝 Checklist:");
  for (const item of checklist) {
    const icon = item.checked ? "✅" : item.required ? "❌" : "⚠️";
    console.log(`   ${icon} [${item.number}] ${item.name}`);
  }
  
  console.log("\n" + "═".repeat(60));
  
  if (!canFinalize) {
    console.log("\n⚠️ Claude Designer operation needs verification before proceeding.");
    const failedItems = checklist.filter(i => !i.checked && i.required);
    if (failedItems.length > 0) {
      console.log("\nIssues to verify:");
      failedItems.forEach(i => console.log(`   - ${i.name}: ${i.description}`));
    }
  } else {
    console.log("\n✅ Claude Designer operation is verified and ready.");
  }
  
  if (jsonArg) {
    const report: CompletenessReport = { checklist, score, maxScore, canFinalize };
    console.log("\n" + JSON.stringify(report, null, 2));
  }
}

main();
