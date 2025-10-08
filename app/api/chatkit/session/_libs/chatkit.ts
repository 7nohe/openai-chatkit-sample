export default async function getChatKitSessionToken(
  deviceId: string
): Promise<{ client_secret: string; expires_after: string }> {
  if (!process.env.OPENAI_API_KEY || !process.env.CHATKIT_WORKFLOW_ID) {
    throw new Error("Missing environment variables");
  }
  const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "OpenAI-Beta": "chatkit_beta=v1",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      workflow: { id: process.env.CHATKIT_WORKFLOW_ID },
      user: deviceId,
    }),
  });

  const { client_secret, expires_after } = await response.json();

  return { client_secret, expires_after };
}
