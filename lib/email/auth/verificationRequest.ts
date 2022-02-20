import mjml2html from "mjml";

export function html({ email, url }: Record<"url" | "host" | "email", string>) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  // const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  const output = mjml2html(`
<mjml>
  <mj-head>
    <mj-title>Your App sign in link</mj-title>
    <mj-preview>You'll need to use this link to finish logging in.</mj-preview>
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
            To finish logging in to your <strong>App</strong> account, click the link below. This one-time link will expire in 30 minutes.
          </p>
        </mj-text>
        <mj-button background-color="#000" border-radius="6px" color="#fff" font-size="18px" font-weight="600" href="${url}" inner-padding="8px 16px" line-height="1.5" line-height="1" padding="8px 0 16px" target="_blank" width="196px">
          Sign in
        </mj-button>
        <mj-text>
          <p>
            This message was sent to <strong>${escapedEmail}</strong>. If you didn’t make this request or you need assistance, visit our <strong>Help Center.</strong>
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
  return `Your App sign in link for ${host} is:\n${url}\n\n`;
}
