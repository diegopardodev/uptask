# COPY — Auth

All user-facing text for the authentication layer of UpTask. This is the single source of truth: screens, forms, buttons, validation, errors, success states, and transactional email.

**Scope:** registration, email confirmation (and resend), login, logout, forgot password, reset password, profile editing, password change.

## Conventions

- **Language:** English (`lang="en"`). One locale for now; keys are written so a second locale can be added without rewording.
- **Voice:** direct and plain. Second person ("your account"), active voice, no exclamation marks.
- **Sentence case** everywhere — headings, labels, and buttons. Never Title Case, never ALL CAPS.
- **Product name** is always `UpTask` — capital U, capital T, one word.
- **No trailing periods** on labels, placeholders, buttons, or field-level validation messages. Full sentences (descriptions, banners, emails) do take periods.
- **Errors say what to do next**, not just what went wrong.
- **Never confirm or deny that an email exists.** Forgot-password and resend-confirmation always return the same neutral message. See [Account enumeration](#account-enumeration).
- **Placeholders are examples, not instructions.** Never repeat the label in the placeholder, and never use a placeholder in place of a label.

---

## 0. Root layout metadata

**File:** `app/layout.tsx` — the global `metadata` export. Every page title in this document is the **resolved** title; pages only set the segment before the dash and the template appends the rest.

| Slot | Value |
| --- | --- |
| `title.default` | `UpTask` |
| `title.template` | `%s — UpTask` |
| `description` | `UpTask is a project and task manager for small teams — plan the work, assign it, and track it to done.` |
| `applicationName` | `UpTask` |
| `lang` (on `<html>`) | `en` |

So a page that exports `title: 'Log in'` renders `Log in — UpTask`, matching section 4. The home page falls back to `UpTask` alone (no dash, no repetition).

**Separator:** em dash with spaces (` — `), never a pipe or hyphen.

---

## 1. Sign up

**Route:** `/auth/sign-up`

| Slot | Text |
| --- | --- |
| Page title (`<title>`) | `Create an account — UpTask` |
| Meta description | `Create a free UpTask account and start planning your team's projects.` |
| Heading | `Create an account` |
| Subheading | `Start planning your team's work in minutes.` |

### Form

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `name` | `Name` | `Ada Lovelace` | — |
| `email` | `Email` | `you@company.com` | — |
| `password` | `Password` | `••••••••` | `At least 8 characters.` |
| `passwordConfirmation` | `Confirm password` | `••••••••` | — |

**Password visibility toggle:** `Show password` / `Hide password` (`aria-label`; icon-only button).

### Actions

| Slot | Text |
| --- | --- |
| Submit | `Create account` |
| Submit (pending) | `Creating account…` |
| Legal line | `By creating an account you agree to our Terms of Service and Privacy Policy.` |
| Footer link | `Already have an account? Log in` |

### Success

Sign-up does **not** log the user in — it hands off to email confirmation.

| Slot | Text |
| --- | --- |
| Toast | `Account created. Check your email to confirm it.` |
| Redirect | `/auth/confirm-email?email=<email>` |

---

## 2. Confirm your email

**Route:** `/auth/confirm-email` — the "we sent you a link" waiting screen shown right after sign-up.

| Slot | Text |
| --- | --- |
| Page title | `Confirm your email — UpTask` |
| Heading | `Confirm your email` |
| Body (email known) | `We sent a confirmation link to **{email}**. Open it to activate your account. The link expires in 24 hours.` |
| Body (email unknown) | `We sent you a confirmation link. Open it to activate your account. The link expires in 24 hours.` |
| Hint | `Nothing in your inbox? Check your spam folder before requesting a new link.` |
| Resend button | `Resend confirmation email` |
| Resend (pending) | `Sending…` |
| Resend (cooldown) | `Resend available in {seconds}s` |
| Footer link | `Back to log in` |

### Resend result

| State | Text |
| --- | --- |
| Success (neutral — always this, see [Account enumeration](#account-enumeration)) | `If that email needs confirming, a new link is on its way.` |
| Rate limited | `You've requested too many links. Try again in {minutes} minutes.` |

---

## 3. Email confirmation result

**Route:** `/auth/confirm-email/[token]` — where the link in the email lands.

| State | Heading | Body | Action |
| --- | --- | --- | --- |
| Loading | `Confirming your email` | `This will only take a moment.` | — |
| Success | `Email confirmed` | `Your account is ready. Log in to get started.` | `Go to log in` |
| Expired token | `This link has expired` | `Confirmation links are valid for 24 hours. Request a new one and we'll email it to you.` | `Send a new link` |
| Invalid token | `This link isn't valid` | `The link may be incomplete or already used. Request a new one to confirm your email.` | `Send a new link` |
| Already confirmed | `Already confirmed` | `This email was confirmed already. You can log in.` | `Go to log in` |

---

## 4. Log in

**Route:** `/auth/login`

| Slot | Text |
| --- | --- |
| Page title | `Log in — UpTask` |
| Meta description | `Log in to UpTask to manage your projects, tasks, and team.` |
| Heading | `Log in to your account` |
| Subheading | `Pick up where your team left off.` |

### Form

| Field | Label | Placeholder |
| --- | --- | --- |
| `email` | `Email` | `you@company.com` |
| `password` | `Password` | `••••••••` |

| Slot | Text |
| --- | --- |
| Remember checkbox | `Keep me logged in` |
| Forgot link | `Forgot your password?` |
| Submit | `Log in` |
| Submit (pending) | `Logging in…` |
| Footer link | `Don't have an account? Sign up` |

### Errors (form-level banner)

| Case | Text |
| --- | --- |
| Wrong email or password | `That email and password don't match. Check both and try again.` |
| Email not confirmed | `Confirm your email before logging in. We can send you a new link.` — with action `Resend confirmation email` |
| Too many attempts | `Too many login attempts. Try again in {minutes} minutes.` |
| Account disabled | `This account has been disabled. Contact your project manager for access.` |

> Never distinguish "no such user" from "wrong password" — both use the same message.

### Success

| Slot | Text |
| --- | --- |
| Toast | `Welcome back, {name}.` |
| Redirect | `/projects` (or the `redirectTo` the user was originally headed to) |

---

## 5. Forgot password

**Route:** `/auth/forgot-password`

| Slot | Text |
| --- | --- |
| Page title | `Reset your password — UpTask` |
| Heading | `Reset your password` |
| Subheading | `Enter your email and we'll send you a link to set a new one.` |
| Field label | `Email` |
| Placeholder | `you@company.com` |
| Submit | `Send reset link` |
| Submit (pending) | `Sending…` |
| Footer link | `Back to log in` |

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

**Route:** `/auth/reset-password/[token]`

| Slot | Text |
| --- | --- |
| Page title | `Set a new password — UpTask` |
| Heading | `Set a new password` |
| Subheading | `Choose a password you haven't used on UpTask before.` |

### Form

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `password` | `New password` | `••••••••` | `At least 8 characters.` |
| `passwordConfirmation` | `Confirm new password` | `••••••••` | — |

| Slot | Text |
| --- | --- |
| Submit | `Save new password` |
| Submit (pending) | `Saving…` |
| Footer link | `Back to log in` |

### Token states

| State | Heading | Body | Action |
| --- | --- | --- | --- |
| Expired | `This link has expired` | `Reset links are valid for 1 hour. Request a new one to continue.` | `Request a new link` |
| Invalid | `This link isn't valid` | `The link may be incomplete or already used. Request a new one to reset your password.` | `Request a new link` |

### Success

| Slot | Text |
| --- | --- |
| Heading | `Password updated` |
| Body | `Your password has been changed. You've been logged out everywhere else.` |
| Toast | `Password updated. Log in with your new password.` |
| Action | `Go to log in` |

---

## 7. Log out

| Slot | Text |
| --- | --- |
| Menu item | `Log out` |
| Confirm dialog title | `Log out of UpTask?` |
| Confirm dialog body | `You'll need to log in again to get back to your projects.` |
| Confirm button | `Log out` |
| Cancel button | `Cancel` |
| Success toast | `You're logged out.` |
| Session expired banner | `Your session expired. Log in again to continue.` |

---

## 8. Profile

**Route:** `/settings/profile`

| Slot | Text |
| --- | --- |
| Page title | `Profile — UpTask` |
| Heading | `Profile` |
| Description | `Update the name and email your team sees.` |

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `name` | `Name` | `Ada Lovelace` | `Shown on your tasks, notes, and status changes.` |
| `email` | `Email` | `you@company.com` | `Changing this requires confirming the new address.` |

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

**Route:** `/settings/password`

| Slot | Text |
| --- | --- |
| Page title | `Password — UpTask` |
| Heading | `Change password` |
| Description | `Use a password you haven't used on UpTask before.` |

| Field | Label | Placeholder | Helper text |
| --- | --- | --- | --- |
| `currentPassword` | `Current password` | `••••••••` | — |
| `password` | `New password` | `••••••••` | `At least 8 characters.` |
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

Shared by client (Zod + React Hook Form) and server — one schema, one message. Field-level, shown beneath the input, no trailing period.

### Name

| Rule | Message |
| --- | --- |
| Required | `Enter your name` |
| Too short (< 2) | `Your name must be at least 2 characters` |
| Too long (> 60) | `Your name can't be longer than 60 characters` |

### Email

| Rule | Message |
| --- | --- |
| Required | `Enter your email` |
| Invalid format | `Enter a valid email address` |
| Too long (> 254) | `That email address is too long` |
| Already registered (sign-up) | `An account with this email already exists` — with inline action `Log in` |

### Password

| Rule | Message |
| --- | --- |
| Required | `Enter a password` |
| Too short (< 8) | `Your password must be at least 8 characters` |
| Too long (> 72) | `Your password can't be longer than 72 characters` |
| Current password required | `Enter your current password` |

### Password confirmation

| Rule | Message |
| --- | --- |
| Required | `Confirm your password` |
| Mismatch | `Passwords don't match` |

---

## 11. System and network errors

Shown as a form-level banner above the submit button, or as an error toast for background actions.

| Case | Text |
| --- | --- |
| Unexpected server error | `Something went wrong on our end. Try again in a moment.` |
| Network offline / request failed | `We couldn't reach UpTask. Check your connection and try again.` |
| Request timed out | `That took too long. Try again.` |
| Email delivery failed | `We couldn't send that email. Try again in a few minutes.` |
| Generic rate limit | `Too many requests. Try again in {minutes} minutes.` |
| Not authorized (protected route) | `Log in to continue.` |

---

## 12. Transactional email

Plain, short, one action per message. Sent from `EMAIL_FROM` (e.g. `UpTask <no-reply@uptask.dev>`).

### 12.1 Confirm your email

- **Subject:** `Confirm your UpTask email`
- **Preheader:** `One click and your account is ready.`

```
Hi {name},

Thanks for signing up for UpTask. Confirm your email address to
activate your account.

[ Confirm my email ]

This link expires in 24 hours. If it stops working, request a new
one from the login screen.

If you didn't create an UpTask account, you can ignore this email.

— The UpTask team
```

- **Button:** `Confirm my email`
- **Fallback line:** `Button not working? Paste this into your browser: {url}`

### 12.2 Reset your password

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

- **Subject:** `Your UpTask password was changed`
- **Preheader:** `If this wasn't you, act now.`

```
Hi {name},

Your UpTask password was changed on {date} and you've been logged
out of all other devices.

If this was you, nothing more to do.

If it wasn't, reset your password immediately:

[ Reset my password ]

— The UpTask team
```

### 12.4 Confirm your new email address

Sent to the **new** address when a user changes their email in Profile.

- **Subject:** `Confirm your new UpTask email`
- **Preheader:** `Confirm to finish the change.`

```
Hi {name},

You asked to change the email on your UpTask account to this
address. Confirm it to finish the change.

[ Confirm this email ]

This link expires in 24 hours. Until you confirm, keep logging in
with your old address.

If you didn't request this, you can ignore this email.

— The UpTask team
```

---

## 13. Accessibility strings

Not visible on screen, but part of the copy — screen readers and assistive tech read these.

| Element | Text |
| --- | --- |
| Logo | `UpTask` (alt) |
| Logo link | `UpTask home` (`aria-label`) |
| Password visibility toggle | `Show password` / `Hide password` |
| Loading spinner | `Loading` |
| Submit pending region | `Submitting the form` (`aria-live="polite"`) |
| Error summary region | `There's a problem with this form` (`aria-live="assertive"`) |
| Required field marker | `required` |
| Password requirements region | `Password must be at least 8 characters` (`aria-describedby`) |

---

## Account enumeration

Three flows must never reveal whether an email is registered:

1. **Forgot password** — always `If an account exists for {email}, we've sent a link…`
2. **Resend confirmation** — always `If that email needs confirming, a new link is on its way.`
3. **Login failure** — always `That email and password don't match. Check both and try again.`

Sign-up is the deliberate exception: it must say `An account with this email already exists` so the user can recover. That's an accepted trade-off — it's the only flow where the alternative is a dead end.

---

## Placeholder tokens

| Token | Meaning | Example |
| --- | --- | --- |
| `{name}` | The user's name | `Ada` |
| `{email}` | The email in play | `ada@company.com` |
| `{url}` | Full action URL including token | `https://uptask.dev/auth/reset-password/abc123` |
| `{minutes}` | Whole minutes until retry | `15` |
| `{seconds}` | Whole seconds until retry | `45` |
| `{date}` | Localized date and time | `14 Aug 2026 at 09:31` |
