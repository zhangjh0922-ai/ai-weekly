# Complete model capability comparison and site design

> **For agentic workers:** Use parallel bounded tasks for evidence and page implementation. The user has approved the editorial direction and explicitly requested completing the omitted model comparison and remaining pages.

**Goal:** Deliver the original model/function overview and a consistent design across all public page types.

**Architecture:** Typed, source-backed model/function records feed one interactive comparison table. Twelve function explanations describe purpose, mechanism, boundaries, and representative task; the existing real browser recording becomes supporting evidence. The existing Astro layout and editorial CSS apply to all routes. Keep chronological model data and article content intact.

**Tech Stack:** Astro, TypeScript, CSS, native browser controls; existing EdgeOne and GitHub Pages deployment.

- [x] Record sourced capabilities for representative current general and specialist models. Keep native model outputs, external tool execution, and product integration distinct; missing evidence means unverified, not unsupported. Cite each populated cell with verification date.
- [x] Implement searchable model/function matrix with selected-model comparison, function grouping, cell details and source links; preserve base-path links, keyboard use and no-JS access.
- [x] Explain text/reasoning, image understanding, search, code, files, image generation, speech recognition, speech generation, video generation, tool calling, browser use and computer use. Preserve real recording provenance.
- [x] Update all public page types: homepage entry, timeline, concept list/detail, issue archive/detail, tag archive, about, 404. Keep a single masthead, navigation, colors and spacing; readable narrower article columns.
- [x] Validate Astro types and both deployment path builds; check matrix sources/internal links, filters/reset/empty state/cell dialog/hash/back, existing page interactions, video playback and mobile overflow.
- [ ] Review scope and implementation; commit, publish through existing Git integration, verify live representative pages and hand back screenshots.

## Acceptance checks

The default function page visibly includes multiple general models and dedicated image/audio/video models. Each column has an explanation and each evidence-bearing cell exposes the exact model/entry, condition, source and date. No capability is inferred solely from a brand name or a generic agent tag. About, timeline and all archives must visibly share the approved homepage design, not retain the old masthead/theme.

## Verification recorded on 2026-11-04

- 20 exact model IDs, 12 capability columns, 103 evidence records; all evidence dates and official sources reviewed. Each matrix model links to its timeline anchor.
- Astro check: 27 files, 0 errors, warnings or hints. Root-domain and `/ai-weekly/` builds each generated 77 pages.
- Root build HTML audit: 2,451 internal references, 265 anchor references, all 77 pages share the editorial layout, no missing targets, duplicate IDs or invalid ARIA references.
- Browser checks: category columns, model search, two-model selection, reset, empty state, evidence modal and Escape; timeline/concept/archive filtering; `#computer`, `#recording` and browser Back; full recording played through 63.833333 seconds.
- No-JavaScript build: full 20 × 12 table readable, script controls hidden, direct evidence anchor expands its native details section.
- At 390 px viewport, table scroll stays inside its container and all representative routes fit the viewport. Fixed an absolute-positioned screen-reader label escaping its scroll container by establishing the container as its positioning context.
- Independent code review completed. Long-running development server refreshed after stale content-schema defaults affected the home preview; optional brief data also has an explicit empty fallback.
