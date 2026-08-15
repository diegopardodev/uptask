export const emailTheme = `
@theme {
    --color-primary-400: #a78bfa;
    --color-primary-500: #8b5cf6;
    --color-primary-600: #7c3aed;
    --color-primary: var(--color-primary-400);

    --color-bg: #ffffff;
    --color-bg-2: #f4f4f7;

    --color-fg: #18181b;
    --color-fg-2: #4b4b55;
    --color-fg-3: #7c7c8a;

    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --font-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

    /* Used as \`text-13:\` etc. in templates. These live here rather than as
       \`@utility\` rules: the utility string is imported inside
       \`layer(utilities)\`, and \`@utility\` can't be nested in a layer. */
    --text-13: 13px;
    --text-13--line-height: 20px;
    --text-16: 16px;
    --text-16--line-height: 24px;
    --text-28: 28px;
    --text-28--line-height: 36px;

    /* Used as \`max-mobile:\` in templates. A \`@custom-variant\` can't be
       declared here: this string is imported inside \`layer(theme)\`. */
    --breakpoint-mobile: 600px;
}
`;
