## Scope

Restructure the ECB manual into 3 top-level categories with collapsible sidebar groups, a new category-card home page, and two brand-new sections (Time Deposit + AIFT Fund Purchase).

## 1. Data model changes (`src/pages/EcbGuide.tsx`)

Replace the flat `sectionKeys` array with a grouped structure:

```ts
const groups = [
  {
    key: "ecb", icon: Building, sectionKeys: [
      "overview","documents","signup","login","account",
      "corporate","corpAddress","personal","homeAddress",
      "review","consent","twoFactor","faq"
    ]
  },
  { key: "deposit", icon: PiggyBank, sectionKeys: ["depositIntro","depositSteps"] },
  { key: "fund",    icon: TrendingUp, sectionKeys: ["fundIntro","fundSteps"] },
];
```

Add a new state:
- `view: "home" | "section"` — home shows the 3 category cards (and, when one is expanded, the 13 / 2 / 2 sub-cards). A click on any sub-card sets `active` and switches to `view = "section"`.
- `expandedGroup: GroupKey | null` for the home accordion.
- `openGroups: Set<GroupKey>` for the sidebar collapsibles (auto-open the group containing `active`).

## 2. Home view (new)

Three large white cards (`#FFFFFF` bg, `#E0E4EA` border, 12px radius, 32px padding, 4px left bar `#2375C5`, hover lift). Each card:
- Icon 40px `#2375C5`
- Title 18px/700 `#333`
- Subtitle 13px `#666`
- Click → expands inline to show the existing sub-section cards grid (reuse current home card styling already in the codebase).

Sub-cards under each big card use the existing 13-card pattern; only the contents change per group.

## 3. Sidebar restructure

Replace flat list with 3 `Collapsible` groups using `ChevronDown` rotated 180° when open. Group header:
- bg `rgba(255,255,255,0.1)`, white text 14/700, 12px 16px padding.

Inside each group: existing section buttons (icon + label), highlighted active state as today. Auto-expand the group of the active section.

Mobile drawer mirrors the same collapsible structure.

## 4. New sections

### `depositIntro` (Time Deposit – preparation)
Blue tip card with the warning copy. "Next" button → `depositSteps`.

### `depositSteps` (Step 01–10)
Reuse the existing `Label` + image + description pattern (like `account` / `homeAddress`). Each step gets:
- title, description, optional notes
- placeholder image `/images/time_deposit_0N.webp` (using existing `<Img />` placeholder for now since images aren't uploaded)

Bottom nav: `← 返回首頁` (back to home view) / `下一步：購買 AIFT FUND →` (jumps to `fundIntro`).

### `fundIntro`
Blue tip card with fund preparation copy.

### `fundSteps` (Step 01–13)
Same step pattern. Step 04 includes a small table (Days Elapsed / Annualized Return / Units / ...). Step 06 includes:
- red warning note
- gray example calculation card

Bottom nav: `← 開始定存` (back to `depositSteps`) / `返回首頁`.

## 5. Translations (`src/i18n/translations.ts`)

Add keys for all 4 languages (zh-TW, zh-CN, en, ja):

- `guide.home.title`, `guide.home.desc`
- `guide.group.ecb.title/sub`, `guide.group.deposit.title/sub`, `guide.group.fund.title/sub`
- `guide.nav.depositIntro/depositSteps/fundIntro/fundSteps`
- `guide.depositIntro.pt/desc/tip`
- `guide.depositSteps.pt/desc` + `guide.td.s1.t/d` … `guide.td.s10.t/d`
- `guide.fundIntro.pt/desc/tip`
- `guide.fundSteps.pt/desc` + `guide.fd.s1.t/d` … `guide.fd.s13.t/d`
- `guide.fd.s4.col.*` for the table rows
- `guide.fd.s6.warn`, `guide.fd.s6.example.*`
- `guide.backToHome`, `guide.nextDeposit`, `guide.nextFund`, `guide.prevDeposit`

zh-TW will use the copy provided verbatim; en/zh-CN/ja get straightforward translations matching existing tone.

## 6. Files touched

- `src/pages/EcbGuide.tsx` — major refactor (home view, grouped sidebar, 4 new section renderers, new nav buttons)
- `src/i18n/translations.ts` — add ~150 keys × 4 languages

No backend / data changes. Existing 13 ECB sections keep their content untouched.

## Out of scope

- Real screenshot uploads for the new sections — placeholders only until assets land.
- Changes to the popup-window behaviour (still works; the new home is rendered inside the same overlay/popup).
