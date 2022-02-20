import mjml2html from "mjml";

export function html({ email, token }: Record<"email" | "token", string>) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;

  // Use https://mjml.io/try-it-live to edit template:
  const output = mjml2html(`
<mjml>
  <mj-head>
    <mj-title>Your App verification code</mj-title>
    <mj-preview>You'll need to use this code to finish logging in.</mj-preview>
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
            To finish logging in to your <strong>App</strong> account, enter this verification code below. This one-time code will expire in 30 minutes.
          </p>
        </mj-text>
        <mj-text color="#000" font-size="28px" font-weight="600" line-height="1" padding="0 0 16px" align="center" font-family="ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace" letter-spacing="8px">
          ${token}
        </mj-text>
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

export function text({ token, host }: Record<"host" | "token", string>) {
  return `Your App verification code for ${host} is:\n${token}\n\n`;
}
