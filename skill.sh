#!/usr/bin/env bash

# Local skill registry for Claude Design Premium
declare -A SKILLS=(
  [harness-auto-setup]="skills/harness-auto-setup.skill.md"
  [brief-framing]="skills/brief-framing.skill.md"
  [design-system-guardian]="skills/design-system-guardian.skill.md"
  [visual-originality-audit]="skills/visual-originality-audit.skill.md"
  [ui-audit]="skills/ui-audit.skill.md"
  [polish-phase]="skills/polish-phase.skill.md"
  [text-integrity-audit]="skills/text-integrity-audit.skill.md"
  [fivu-identity-showcase]="skills/fivu-identity-showcase.skill.md"
  [mobile-first-audit]="skills/mobile-first-audit.skill.md"
  [accessibility-audit]="skills/accessibility-audit.skill.md"
  [tailwind-audit]="skills/tailwind-audit.skill.md"
  [framework-handoff]="skills/framework-handoff.skill.md"
  [assemble-design-system-showcase]="skills/assemble-design-system-showcase.skill.md"
  [full-output-enforcement]="skills/full-output-enforcement.skill.md"
  [image-to-code]="skills/image-to-code.skill.md"
)

if [[ $# -eq 0 ]]; then
  echo "Usage: ./skill.sh <skill-name>"
  echo "Available skills:"
  for key in "${!SKILLS[@]}"; do
    echo "  - $key"
  done
else
  if [[ -n "${SKILLS[$1]}" ]]; then
    cat "${SKILLS[$1]}"
  else
    echo "Skill not found: $1"
  fi
fi
