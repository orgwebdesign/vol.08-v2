# Plan: Create Univers Vol.08 Page

## Context
- Existing home page: `index.html` (header + footer + 8 sections)
- Existing styles: `assets/css/style.css` (1430 lines)
- Existing scripts: `script.js` (Swiper + Lucide + mobile menu + about cards)
- Font family: **Grift** (loaded from `assets/font /` — note: existing CSS path has a bug, references `../fonts/` but actual folder is `font /` with a space)
- Color tokens: `#ffffff`, `#111111`, `#6f6f6f`, `#e5e5e5`, `#0f0f0f`, `#0d0d0d`
- Sizing: max-width 1440px, section padding 100px 5%
- Icons: Lucide, Carousel: Swiper 11
- **Never modify existing header/footer markup**

## Scope
Create a standalone `univers.html` page with 8 sections matching the ANTIGRAVITY prompt:
1. Hero éditorial (2 colonnes)
2. Notre histoire (image pleine largeur + texte)
3. Nos valeurs (3 cartes hover noir/blanc)
4. Notre méthode (timeline 01-04)
5. Pourquoi Vol.08 (4 statistiques)
6. Inspirations (galerie 6 images)
7. Engagement qualité (fond noir)
8. CTA final (2 boutons)

## Decisions
1. **New CSS file**: `assets/css/univers.css`
   - Keeps home page styles untouched
   - Page self-contained for future maintainability
2. **Images**: Use existing CloudFront URLs (`https://d392ke4nwqmbdz.cloudfront.net/Images/Vol08/...`) and Unsplash where needed
3. **Nav link**: Do NOT modify `index.html` header. The existing `#` link for "Univers" stays as-is. The new page has its own header.
4. **JS**: Only Lucide icons init + scroll header class. No Swiper on this page.
5. **Existing font path bug**: OUT OF SCOPE. The `../fonts/` vs `font /` mismatch is a pre-existing issue. Note it for future work but do not fix here.

## Implementation Steps
1. Create `univers.html`:
   - Reuse identical header markup from `index.html` lines 22–44
   - Reuse identical footer markup from `index.html` lines 434–488
   - Add 8 content sections per prompt
   - Link to `style.css`, `univers.css`, Lucide script
2. Create `assets/css/univers.css`:
   - All new section styles
   - Responsive breakpoints at 1024px, 768px, 560px matching existing CSS
   - Animations: 0.35s ease, hover `scale(1.03)`
   - Corner radius: 2px
   - Discrètes box-shadows
3. Create `script-univers.js` (or reuse existing):
   - Header scroll effect
   - Lucide icons init

## Risks
- **Header/footer duplication**: Any future change to header/footer must be applied in two files because `index.html` cannot be modified per instructions.
- **Font bug propagation**: The new page will inherit the same font path mismatch if it uses the same `@font-face` rules from `style.css`.

## Validation
- Visually compare `univers.html` with `index.html` for brand consistency
- Test responsive behavior at 1024px, 768px, 560px, 420px
- Verify all hover states (cards, buttons, gallery)
- Verify Lucide icons render correctly

## Out of Scope
- Fixing existing font path bug in `style.css`
- Updating the "Univers" nav link in `index.html`
