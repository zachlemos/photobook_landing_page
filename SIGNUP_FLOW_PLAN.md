# Signup Flow Redesign Plan

## Objective
Make the signup process as simple and accessible as possible for users (primarily women aged 50-65+), by embedding a signup field directly below the hero section, minimizing cognitive load, and providing clear, consistent feedback and analytics.

---

## 1. UI/UX Changes

### 1.1. Embedded Signup Field (Above the Fold)
- Place a signup form directly below the hero text.
- Only the email input is visible initially.
- When the user clicks or focuses on the email input (or after they fill it out—TBD in dev), reveal the additional fields (name, interest, etc.), matching the current bottom form.
- Show the families joined counter near the top form as well.
- After successful signup, show the same confirmation state as the bottom form.

### 1.2. "Learn More" Button
- Add a secondary CTA styled as a typical secondary button.
- Clicking it smoothly scrolls the user to the next section (details/signup at the bottom).

---

## 2. Form Logic & State Sync
- Both top and bottom forms should:
  - Use the same validation and field requirements.
  - Sync state: if a user signs up at the top, the bottom form should show the confirmation state (and vice versa).
  - Prevent duplicate signups.
- If a user starts filling out the top form, pre-fill the bottom form if they scroll down.

---

## 3. Analytics & Tracking
- Track which form (top or bottom) the user signs up from (e.g., via a `signup_location` property).
- Fire analytics events when:
  - The top form is viewed.
  - The bottom form is viewed.
  - A signup is completed (with location info).
- (Optional) Track partial completions (e.g., email entered but not submitted).

---

## 4. Messaging & Feedback
- Use the same confirmation message and UI for both forms after signup.
- Show the families joined counter near both forms.

---

## 5. Implementation Steps
1. Check out a new branch for this feature.
2. Refactor the signup form into a reusable component with props for location/context.
3. Implement the above-the-fold embedded signup form with progressive disclosure.
4. Add the "Learn More" secondary CTA and smooth scroll behavior.
5. Sync state between the two forms and handle confirmation UI.
6. Add analytics events for form views and submissions.
7. Test for accessibility and usability (large buttons, clear feedback, etc.).
8. QA and review with real users if possible.

---

## Open Questions
- Should additional fields appear on focus or after email is filled? (Recommend: on focus for clarity, but can A/B test.)
- Should we allow users to edit their info after submitting, or just show a confirmation?

---

## Notes
- Minimize cognitive load: keep the UI uncluttered and feedback immediate.
- Prioritize accessibility: large, high-contrast buttons and text.
- Avoid popups/modals unless user feedback suggests otherwise. 