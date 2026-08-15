# COPY — Auth

All user-facing text for the authentication layer of UpTask. This is the single source of truth: screens, forms, buttons, validation, errors, success states, and transactional email.

**Scope:** registration, email confirmation (and resend), sign-in, sign-out, forgot password, reset password, profile editing, password change.

**Status:** every section is tagged with what exists in the codebase today.

## Conventions

- **Language:** English (`lang="en"`, set in `app/layout.tsx`). One locale for now; keys are written so a second locale can be added without rewording.
- **Voice:** direct and plain. Second person ("your account"), active voice, no exclamation marks.
- **Sentence case** everywhere — headings, labels, and buttons. Never Title Case, never ALL CAPS. This includes `Sign in` and `Sign up` as button and link text.
- **Product name** is always `UpTask` — capital U, capital T, one word. Also in `alt` text.
- **"Sign in" / "sign up", not "log in" / "register".** The routes (`/auth/sign-in`, `/auth/sign-up`), the server actions, and Better Auth all use sign-in/sign-up; the copy follows. The verb is two words (`Sign in`), the noun-adjective is hyphenated (`the sign-in screen`).
- **No trailing periods** on labels, placeholders, buttons, helper text, or field-level validation messages. Full sentences (descriptions, banners, toasts, emails) do take periods.
- **Ellipsis** in pending labels is the single character `…`, never three periods.
- **Errors say what to do next**, not just what went wrong.
- **Never confirm or deny that an email exists.** Forgot-password and resend-confirmation always return the same neutral message. See [Account enumeration](#account-enumeration).
- **Placeholders are examples, not instructions.** Never repeat the label in the placeholder, and never use a placeholder in place of a label.

## Delivery surfaces

Where a string appears is part of the copy contract.

| Surface | Component | Used for |
| --- | --- | --- |
| Toast | `sonner` — `<Toaster>` in `app/layout.tsx` | All form-level success and failure. Top-right, light theme, rich colors, **one toast at a time**, 5s. |
| Field error | `FormError` (`src/shared/components/forms/FormError.tsx`) | Zod validation, beneath the input. |
| Helper text | Plain `<p>` beneath the input | Static guidance. Currently **replaced** by the field error when one is present, so the two never show together. |

There is no form-level banner component today. Sections below that specify a banner are marked and need one built first — see [Drift](#drift).

---

## 0. Root layout metadata

**File:** `app/layout.tsx` — the global `metadata` export. Every page title in this document is the **resolved** title; pages set only the segment and the template prepends the product name.

| Slot | Value | Source |
| --- | --- | --- |
| `title.default` | `UpTask` | `env.APP_NAME` |
| `title.template` | `UpTask - %s` | `` `${env.APP_NAME} - %s` `` |
| `description` | `UpTask is a project and task manager for small teams — plan the work, assign it, and track it to done.` | literal, interpolating `env.APP_NAME` |
| `applicationName` | `UpTask` | `env.APP_NAME` |
| `lang` (on `<html>`) | `en` | literal |

So a page that exports `title: 'Sign in'` renders `UpTask - Sign in`. The home page falls back to `UpTask` alone (no separator, no repetition).

**Order and separator:** product name **first**, then a spaced ASCII hyphen (` - `). Not an em dash, not a pipe, and not product-name-last.

> The product name comes from `env.APP_NAME`, which is required and non-empty (`src/lib/env.ts`). Renaming the app changes every page title and the description; it does **not** change the hardcoded `UpTask` strings in the email templates or the `from` addresses.

---

## 1. Sign up

**Route:** `/auth/sign-up` — `app/auth/sign-up/page.tsx`, form in `src/features/auth/components/SignUpForm.tsx`

| Slot | Text |
| --- | --- |
| Page title (`<title>`) | `UpTask - Create an account` |
| Meta description | `Create a free UpTask account and start planning your team's projects.` |
| Heading | `Create an account` |
| Subheading | `Start planning your team's work in minutes` |

### Form

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `name` | `Name` | `Ada Lovelace` | — |
| `email` | `Email` | `you@company.com` | — |
| `password` | `Password` | `••••••••` | `At least 8 characters` |
| `passwordConfirmation` | `Confirm password` | `••••••••` | — |

**Password visibility toggle** — not built. When it lands: `Show password` / `Hide password` (`aria-label`; icon-only button).

### Actions

| Slot | Text |
| --- | --- |
| Submit | `Create account` |
| Submit (pending) | `Creating account…` — button disabled, `Spinner` shown alongside |
| Legal line | `By creating an account you agree to our Terms of Service and Privacy Policy.` — `Terms of Service` and `Privacy Policy` are links |
| Footer link | `Already have an account? Sign in` → `/auth/sign-in` |

### Success

Sign-up does **not** sign the user in — `requireEmailVerification` is on, so it hands off to email confirmation.

| Slot | Text |
| --- | --- |
| Toast (success) | `Account created. Check your email to confirm it.` — returned by `AuthService.signUp` |
| After submit | The form resets and stays in place. |
| Redirect | None today. Planned: `/auth/confirm-email?email=<email>` once section 2 exists. |

### Errors

| Case | Text | Surface |
| --- | --- | --- |
| Email already registered | `An account with this email already exists` | Toast. Planned: move to an inline `email` field error with an inline `Sign in` action — see section 10. |
| Better Auth rejection | Passes `APIError.message` through unchanged | Toast. Upstream English, not reviewed against this document. |
| Anything else | `Couldn't sign up` | Toast |

---

## 2. Confirm your email

**Route:** `/auth/confirm-email` — the "we sent you a link" waiting screen shown right after sign-up. **Not built.** Sign-up currently sends the email and leaves the user on the sign-up screen with a toast.

| Slot | Text |
| --- | --- |
| Page title | `UpTask - Confirm your email` |
| Heading | `Confirm your email` |
| Body (email known) | `We sent a confirmation link to **{email}**. Open it to activate your account. The link expires in 24 hours.` |
| Body (email unknown) | `We sent you a confirmation link. Open it to activate your account. The link expires in 24 hours.` |
| Hint | `Nothing in your inbox? Check your spam folder before requesting a new link.` |
| Resend button | `Resend confirmation email` |
| Resend (pending) | `Sending…` |
| Resend (cooldown) | `Resend available in {seconds}s` |
| Footer link | `Back to sign in` |

### Resend result

| State | Text |
| --- | --- |
| Success (neutral — always this, see [Account enumeration](#account-enumeration)) | `If that email needs confirming, a new link is on its way.` |
| Rate limited | `You've requested too many links. Try again in {minutes} minutes.` |

> Better Auth is configured with `sendOnSignIn: true`, so an unverified user who tries to sign in is re-sent a confirmation link automatically. A manual resend button is still needed for users who never reach the sign-in screen.

---

## 3. Email confirmation result

**Route:** the link in the email points at Better Auth's own handler under `/api/auth/[...all]` (`app/api/auth/[...all]/route.ts`), which verifies the token and — because `autoSignInAfterVerification: true` — signs the user in and redirects. There is **no custom result screen**, so none of the copy below renders yet.

Building `/auth/confirm-email/[token]` (or a redirect target that reports the outcome) would use:

| State | Heading | Body | Action |
| --- | --- | --- | --- |
| Loading | `Confirming your email` | `This will only take a moment.` | — |
| Success | `Email confirmed` | `Your account is ready.` | `Go to my projects` |
| Expired token | `This link has expired` | `Confirmation links are valid for 24 hours. Request a new one and we'll email it to you.` | `Send a new link` |
| Invalid token | `This link isn't valid` | `The link may be incomplete or already used. Request a new one to confirm your email.` | `Send a new link` |
| Already confirmed | `Already confirmed` | `This email was confirmed already. You can sign in.` | `Go to sign in` |

> The success copy says "Your account is ready" and sends the user onward rather than to a sign-in screen, because verification signs them in automatically.

---

## 4. Sign in

**Route:** `/auth/sign-in` — `app/auth/sign-in/page.tsx`, form in `src/features/auth/components/SignInForm.tsx`

| Slot | Text |
| --- | --- |
| Page title | `UpTask - Sign in` |
| Meta description | `Sign in to UpTask to manage your projects, tasks, and team.` |
| Heading | `Sign in to your account` |
| Subheading | `Pick up where your team left off.` |

### Form

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `email` | `Email` | `you@company.com` | — |
| `password` | `Password` | `••••••••` | `At least 8 characters` |

> The password helper text is shown on this screen too. It is redundant here — sign-in doesn't enforce a length — and is a candidate for removal; see [Drift](#drift).

| Slot | Text |
| --- | --- |
| Forgot link | `Forgot your password?` — sits inline with the `Password` label, right-aligned. Currently points at `/`; target is `/auth/forgot-password`. |
| Submit | `Sign in` |
| Submit (pending) | `Signing in…` — not wired; the button has no loading state today. |
| Footer link | `Don't have an account? Sign up` → `/auth/sign-up` |
| Remember checkbox | `Keep me signed in` — not built. |

### Errors

Delivered as a **toast** today. The spec is a form-level banner above the submit button; that needs a banner component.

| Case | Text |
| --- | --- |
| No account for that email | `That email and password don't match. Check both and try again.` |
| Wrong password | Better Auth's `APIError.message`, passed through unchanged — **this leaks the difference from the message above**. See [Drift](#drift) and [Account enumeration](#account-enumeration). |
| Email not confirmed | Also `APIError.message`. Target copy: `Confirm your email before signing in. We've sent you a new link.` |
| Unexpected failure | `Couldn't sign in` |
| Too many attempts | `Too many sign-in attempts. Try again in {minutes} minutes.` — no rate limiting configured. |
| Account disabled | `This account has been disabled. Contact your project manager for access.` — no disabled state in the schema. |

> Never distinguish "no such user" from "wrong password" — both must use the same message.

### Success

| Slot | Text |
| --- | --- |
| Toast | `Welcome back, {name}.` — not shown; the action returns no message on success. |
| Redirect | `/` today. Planned: `/projects` (or the `redirectTo` the user was originally headed to). |

---

## 5. Forgot password

**Route:** `/auth/forgot-password` — not built. Better Auth supports the flow; no `sendResetPassword` handler is configured in `src/lib/auth.ts` yet.

| Slot | Text |
| --- | --- |
| Page title | `UpTask - Reset your password` |
| Heading | `Reset your password` |
| Subheading | `Enter your email and we'll send you a link to set a new one.` |
| Field label | `Email` |
| Placeholder | `you@company.com` |
| Submit | `Send reset link` |
| Submit (pending) | `Sending…` |
| Footer link | `Back to sign in` |

### After submit — confirmation state

| Slot | Text |
| --- | --- |
| Heading | `Check your email` |
| Body | `If an account exists for **{email}**, we've sent a link to reset your password. It expires in 1 hour.` |
| Hint | `Didn't get it? Check your spam folder, or make sure you used the address you signed up with.` |
| Secondary action | `Send it again` |
| Rate limited | `You've requested too many links. Try again in {minutes} minutes.` |

---

## 6. Set a new password

**Route:** `/auth/reset-password/[token]` — not built.

| Slot | Text |
| --- | --- |
| Page title | `UpTask - Set a new password` |
| Heading | `Set a new password` |
| Subheading | `Choose a password you haven't used on UpTask before.` |

### Form

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `password` | `New password` | `••••••••` | `At least 8 characters` |
| `passwordConfirmation` | `Confirm new password` | `••••••••` | — |

| Slot | Text |
| --- | --- |
| Submit | `Save new password` |
| Submit (pending) | `Saving…` |
| Footer link | `Back to sign in` |

### Token states

| State | Heading | Body | Action |
| --- | --- | --- | --- |
| Expired | `This link has expired` | `Reset links are valid for 1 hour. Request a new one to continue.` | `Request a new link` |
| Invalid | `This link isn't valid` | `The link may be incomplete or already used. Request a new one to reset your password.` | `Request a new link` |

### Success

| Slot | Text |
| --- | --- |
| Heading | `Password updated` |
| Body | `Your password has been changed. You've been signed out everywhere else.` |
| Toast | `Password updated. Sign in with your new password.` |
| Action | `Go to sign in` |

---

## 7. Sign out

Not built — there is no authenticated shell to sign out of yet.

| Slot | Text |
| --- | --- |
| Menu item | `Sign out` |
| Confirm dialog title | `Sign out of UpTask?` |
| Confirm dialog body | `You'll need to sign in again to get back to your projects.` |
| Confirm button | `Sign out` |
| Cancel button | `Cancel` |
| Success toast | `You're signed out.` |
| Session expired banner | `Your session expired. Sign in again to continue.` |

---

## 8. Profile

**Route:** `/settings/profile` — not built.

| Slot | Text |
| --- | --- |
| Page title | `UpTask - Profile` |
| Heading | `Profile` |
| Description | `Update the name and email your team sees.` |

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `name` | `Name` | `Ada Lovelace` | `Shown on your tasks, notes, and status changes` |
| `email` | `Email` | `you@company.com` | `Changing this requires confirming the new address` |

| Slot | Text |
| --- | --- |
| Submit | `Save changes` |
| Submit (pending) | `Saving…` |
| Cancel | `Cancel` |
| Success toast (name only) | `Profile updated.` |
| Success toast (email changed) | `Profile updated. Confirm your new email to finish the change.` |
| Error — email taken | `That email is already in use.` |
| Error — no changes | `Nothing to save — make a change first.` |

---

## 9. Change password

**Route:** `/settings/password` — not built.

| Slot | Text |
| --- | --- |
| Page title | `UpTask - Password` |
| Heading | `Change password` |
| Description | `Use a password you haven't used on UpTask before.` |

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `currentPassword` | `Current password` | `••••••••` | — |
| `password` | `New password` | `••••••••` | `At least 8 characters` |
| `passwordConfirmation` | `Confirm new password` | `••••••••` | — |

| Slot | Text |
| --- | --- |
| Submit | `Update password` |
| Submit (pending) | `Updating…` |
| Success toast | `Password updated.` |
| Error — wrong current password | `That's not your current password.` |
| Error — same as current | `Your new password must be different from your current one.` |

---

## 10. Validation messages

**File:** `src/features/auth/schemas/index.ts` — one `BaseSchema`, from which `SignUpSchema` and `SignInSchema` are derived with `.pick()`. The same schema runs on the client (Zod + React Hook Form, `mode: "all"`, so messages appear on change and on blur) and again in the server action.

Field-level, shown beneath the input via `FormError`, no trailing period.

### Name — sign-up only

| Rule | Message | Status |
| --- | --- | --- |
| Too short (< 2, after trim) | `Your name must be at least 2 characters` | |
| Too long (> 60) | `Your name can't be longer than 60 characters` | |
| Required | `Enter your name` | An empty field falls through to the "at least 2 characters" message. |

### Email

| Rule | Message | Status |
| --- | --- | --- |
| Invalid format | `Enter a valid email address` | |
| Required | `Enter your email` | An empty field falls through to the "valid email address" message. |
| Too long (> 254) | `That email address is too long` | No max length on the field. |
| Already registered (sign-up) | `An account with this email already exists` — with inline action `Sign in` | String is correct but comes from `AuthService.signUp` as a toast, without the inline action. |

### Password

| Rule | Message | Status |
| --- | --- | --- |
| Too short (< 8, sign-up) | `Your password must be at least 8 characters` | |
| Too long (> 72) | `Your password can't be longer than 72 characters` | |
| Required (sign-in) | `Enter a password` | Sign-in only checks that the field is non-empty — it must not restate the length rule, or it would tell an attacker what a valid password looks like. |
| Required (sign-up) | `Enter a password` | Falls through to the "at least 8 characters" message. |
| Current password required | `Enter your current password` | Section 9 not built. |

### Password confirmation

| Rule | Message | Status |
| --- | --- | --- |
| Required | `Confirm your password` | |
| Mismatch | `Passwords don't match` | Attached to the `passwordConfirmation` field. |

---

## 11. System and network errors

Shown as a toast today. The spec is a form-level banner above the submit button for form submissions, and a toast for background actions.

| Case | Text | Status |
| --- | --- | --- |
| Server-side schema rejection | `Invalid data` | Shipped in `src/features/auth/actions/index.ts`. Breaks the "say what to do next" rule; replace with `Check the form and try again.` This should be unreachable — the client validates with the same schema — so it only fires on a tampered or stale request. |
| Sign-up failed, cause unknown | `Couldn't sign up` | Replace with the generic server-error string below. |
| Sign-in failed, cause unknown | `Couldn't sign in` | Replace with the generic server-error string below. |
| Email delivery failed | `We couldn't send that email. Try again in a few minutes.` | Thrown by `EmailService.send`, but it propagates out of Better Auth's `sendVerificationEmail` — the user sees a passed-through `APIError` message instead. |
| Unexpected server error | `Something went wrong on our end. Try again in a moment.` | |
| Network offline / request failed | `We couldn't reach UpTask. Check your connection and try again.` | A failed server action currently rejects with no copy of our own. |
| Request timed out | `That took too long. Try again.` | |
| Generic rate limit | `Too many requests. Try again in {minutes} minutes.` | |
| Not authorized (protected route) | `Sign in to continue.` | No protected routes yet. |

> **Better Auth messages are not our copy.** `AuthService` catches `APIError` and forwards `error.message` straight to the user. Those strings are upstream English written to a different style guide and can change on a dependency bump. Map the cases we care about to the copy in this document and fall back to the generic server-error string.

---

## 12. Transactional email

Plain, short, one action per message.

**Sender addresses** are hardcoded in `src/emails/config/index.ts` — not read from the environment:

| Key | Address | Used by |
| --- | --- | --- |
| `accounts` | `UpTask <accounts@uptask.com>` | Confirm your email |
| `admin` | `UpTask <admin@uptask.com>` | — |
| `default` | `UpTask <noreply@uptask.com>` | — |

> The README documents an `EMAIL_FROM` variable, but `src/lib/env.ts` doesn't define one and nothing reads it. Either add it and drive `config.from` from it, or drop it from the README. The domain here is `uptask.com`; earlier drafts of this document said `uptask.dev`.

Transport is SMTP via Nodemailer (`src/lib/nodemailer.ts`), configured from `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS`. Templates are React Email components under `src/emails/templates/`, rendered to HTML by `AuthEmailService`. **HTML only — no plain-text alternative is generated.**

### 12.1 Confirm your email

**Template:** `src/emails/templates/ConfirmEmail.tsx` — takes `{ url }` only. Sent by Better Auth's `sendVerificationEmail` hook.

- **Subject:** `Confirm your UpTask email`
- **Preheader:** `Confirm your email address` — spec: `One click and your account is ready.`

Shipped body, verbatim:

```
[UpTask logo]

We're almost there!

Thank you for signing up for UpTask.
To verify your account, we just need to confirm your email address.

[ Confirm email ]

If you didn't request this,
please ignore this email.

- The UpTask team
```

Target body — no exclamation mark, states the expiry, and signs off with an em dash:

```
Thanks for signing up for UpTask. Confirm your email address to
activate your account.

[ Confirm my email ]

This link expires in 24 hours. If it stops working, request a new
one from the sign-in screen.

If you didn't create an UpTask account, you can ignore this email.

— The UpTask team
```

- **Button:** `Confirm my email` (shipped: `Confirm email`)
- **Fallback line:** `Button not working? Paste this into your browser: {url}` not present
- **Greeting:** The template has no `Hi {name},` line because it only receives `url`. Pass the user's name through `AuthEmailService.sendConfirmEmail` to add it — Better Auth's hook already provides `user`.
- **Logo `alt`:** `UpTask Logo` — should be `UpTask`; the word "logo" is noise to a screen reader.

### 12.2 Reset your password

No template, and no `sendResetPassword` handler in `src/lib/auth.ts`.

- **Subject:** `Reset your UpTask password`
- **Preheader:** `The link is good for one hour.`

```
Hi {name},

We got a request to reset the password for your UpTask account.
Choose a new one here:

[ Set a new password ]

This link expires in 1 hour and can only be used once.

If you didn't request this, no action is needed — your password
hasn't changed.

— The UpTask team
```

- **Button:** `Set a new password`
- **Fallback line:** `Button not working? Paste this into your browser: {url}`

### 12.3 Password changed

No template.

- **Subject:** `Your UpTask password was changed`
- **Preheader:** `If this wasn't you, act now.`

```
Hi {name},

Your UpTask password was changed on {date} and you've been signed
out of all other devices.

If this was you, nothing more to do.

If it wasn't, reset your password immediately:

[ Reset my password ]

— The UpTask team
```

### 12.4 Confirm your new email address

No template. Sent to the **new** address when a user changes their email in Profile (section 8).

- **Subject:** `Confirm your new UpTask email`
- **Preheader:** `Confirm to finish the change.`

```
Hi {name},

You asked to change the email on your UpTask account to this
address. Confirm it to finish the change.

[ Confirm this email ]

This link expires in 24 hours. Until you confirm, keep signing in
with your old address.

If you didn't request this, you can ignore this email.

— The UpTask team
```

---

## Account enumeration

Three flows must never reveal whether an email is registered:

1. **Forgot password** — always `If an account exists for {email}, we've sent a link…`
2. **Resend confirmation** — always `If that email needs confirming, a new link is on its way.`
3. **Sign-in failure** — always `That email and password don't match. Check both and try again.`

Sign-up is the deliberate exception: it must say `An account with this email already exists` so the user can recover. That's an accepted trade-off — it's the only flow where the alternative is a dead end.

**The sign-in guarantee is currently broken.** `AuthService.signIn` looks the user up first and returns the neutral message only when no row matches; a wrong password for an existing account falls through to Better Auth and surfaces a different string. The two branches also differ in timing, since the wrong-password path does a hash comparison the unknown-email path skips. Fixing it means returning the one neutral message for both, and doing equivalent work in each branch. The `sendOnSignIn: true` behaviour is a related leak: an unconfirmed-email response tells the sender that the account exists.

---

### Needs code, not just copy

| # | Issue |
| --- | --- |
| 17 | **Better Auth `APIError.message` is forwarded to users** in both `signUp` and `signIn`. Map known cases to the copy here; fall back to the generic server error. |
| 18 | **No form-level banner component.** Everything is a toast, and `visibleToasts` is 1, so a second error replaces the first. Errors that need a persistent, re-readable surface — unconfirmed email with a resend action, rate limits — need a banner. |

---

## Placeholder tokens

| Token | Meaning | Example |
| --- | --- | --- |
| `{name}` | The user's name | `Ada` |
| `{email}` | The email in play | `ada@company.com` |
| `{url}` | Full action URL including token | `https://uptask.com/auth/reset-password/abc123` |
| `{minutes}` | Whole minutes until retry | `15` |
| `{seconds}` | Whole seconds until retry | `45` |
| `{date}` | Localized date and time | `14 Aug 2026 at 09:31` |
