import mjml2html from "mjml";

export function html({ email, url }: Record<"url" | "host" | "email", string>) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  // const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  const output = mjml2html(`
  <mjml>
    <mj-head>
      <mj-title>Confirm your Email</mj-title>
      <mj-preview>Use the following link to log in as ${escapedEmail}.</mj-preview>
      <mj-attributes>
        <mj-text font-size="14px" padding="0 0 8px" />
        <mj-all font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" line-height="1.5" />
      </mj-attributes>
    </mj-head>
    <mj-body background-color="#ffffff" width="540px">
      <mj-section>
        <mj-column padding="0 30px">
          <mj-text font-size="34px" font-weight="700" padding="32px 0 0">
            <p>App</p>
          </mj-text>
          <mj-text padding-bottom="8px">
            <p>
              You recently requested a link to sign in, and here it is! Click the
              link below to log in as <strong>${escapedEmail}</strong>.
            </p>
          </mj-text>
          <mj-button background-color="#000" border-radius="6px" color="#fff" font-size="18px" font-weight="600" href="${url}" inner-padding="8px 16px" line-height="1.5" line-height="1" padding="8px 0 16px" target="_blank" width="196px">
            Sign in
          </mj-button>
          <mj-text>
            <p>
              This link expires in 30 minutes, so use it quickly! If you did not request this email you can safely ignore it.
            </p>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  `);
  return output.html;
}

export function text({ url, host }: Record<"url" | "host" | "email", string>) {
  return `Sign in to ${host}\n${url}\n\n`;
}
