# Ziva — Room Onboarding & Behavior Spec
## Game Room & Tool Chamber

---

## 🎮 Game Room

### 1. Entry hint (from main hub)
- **Trigger:** User is on the main hub, hasn't entered Game Room yet
- **Visual:** Animated arrow pointing toward Game Room door
- **Copy:** *"Play quick challenges and earn diamonds while learning."*

### 2. First-time entry popup
- **Trigger:** First time user steps into Game Room
- **Visual:** Ziwa character popup (modal or speech bubble)
- **Copy:**
  > **Ziwa's tip:** "Don't worry if you get something wrong. Every question is part of the journey. There are no penalties here — just explore and learn."
- **Dismiss:** Tap anywhere / "Got it" button

### 3. Correct-answer animation
- **Trigger:** User answers a question correctly
- **Sequence:**
  1. Ziwa says: *"You earned XX diamonds ✨!"*
  2. Enlarged red diamond appears center-screen
  3. Diamond flies toward top-right corner
  4. Top-right diamond counter increments with a small bounce

---

## 🛠 Tool Chamber

### 1. Entry hint (from main hub)
- **Trigger:** User is on the main hub, hasn't entered Tool Chamber yet
- **Visual:** Animated arrow pointing toward Tool Chamber door
- **Copy:** *"Let's imagine your future together."*

### 2. First-time entry popup
- **Trigger:** First time user steps into Tool Chamber
- **Visual:** Ziwa character popup
- **Copy:**
  > **Ziwa's tip:** "This room helps you explore different financial futures."

### 3. Slider discovery (scroll-triggered)
- **Trigger:** User scrolls down to slider section
- **Visual:**
  - Arrow points to slider thumb (dot)
  - Dot pulses outward (ripple effect)
- **Copy:** *"Let's explore different investment styles."*

### 4. First tap on slider → Swipe left guidance
- **Trigger:** User taps the slider thumb for the first time
- **Visual:**
  - Arrow indicator pointing left
  - Bar chart below begins animating with a "magic movement" effect (scale + ease)
- **Copy:**
  > **More Stock, More Aggressive**
  > *"Higher growth potential with larger market swings."*

### 5. After left-swipe completes → Swipe right guidance
- **Trigger:** Immediately after user finishes swiping left
- **Visual:**
  - Arrow indicator pointing right
  - Bar chart animates again with magic movement effect
- **Copy:**
  > **More Bond, More Conservative**
  > *"Lower risk, slower growth, more stability."*

### 6. After right-swipe completes → Free exploration prompt
- **Trigger:** Immediately after user finishes swiping right
- **Visual:**
  - Arrow points down at the slider dot
  - Arrow gently bounces/pulses
- **Copy:**
  > *"Different choices → different life outcomes."*
  > *"Now it's your turn to explore."*

---

## 📝 Copy & UX Suggestions (optional refinements)

A few small tweaks worth considering before you finalize:

| Original | Suggestion | Why |
|---|---|---|
| "Let's imagine your future together." | "See how today's choices shape tomorrow." | More concrete, hints at causality (which is exactly what the slider shows) |
| "More Stock More Aggressive" | "More Stocks → More Aggressive" | Arrow makes the cause-effect clearer; plural reads more naturally |
| "Now it's your turn to explore." | "Your turn — try any mix." | Shorter, more inviting on mobile |
| Diamond message: "You earned XX diamonds ✨!" | "+XX 💎 nice one!" | Shorter for animation timing; feels more like a game reward |

## ⚠️ Edge cases to define

1. **What if the user closes the first-time popup before reading?** → Should Ziwa's tip be accessible again via a "?" icon in the corner?
2. **What if the user skips the slider tutorial?** (e.g., starts dragging before tapping) → Should the left/right swipe prompts still appear, or skip straight to free exploration?
3. **How do you persist "first-time" state?** → Per-user, per-device, or per-session?
4. **Accessibility:** All arrow-only guidance should also have screen-reader text (e.g., "Swipe left to see more aggressive portfolios").
5. **Replay tutorial:** Consider a "Show me again" option in settings.

## 🎬 Animation timing reference

| Animation | Suggested duration | Easing |
|---|---|---|
| Arrow appearance | 200ms fade-in | ease-out |
| Arrow pulse loop | 1.2s per cycle | ease-in-out |
| Diamond fly-to-corner | 600ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Bar chart "magic movement" | 800ms | spring (stiffness 100, damping 12) |
| Popup entrance | 250ms scale + fade | ease-out |

---

*Spec version 1.0 · For Ziva prototype handoff*
