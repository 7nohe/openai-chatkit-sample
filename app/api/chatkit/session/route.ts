import getChatKitSessionToken from "./_libs/chatkit";

const SESSION_COOKIE_NAME = "chatkit_session_id";
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: Request): Promise<Response> {
  let sessionCookie: string | null = null;
  try {
    const cookie = request.headers.get("cookie");
    const value = cookie
      ?.split("; ")
      .find((row) => row.startsWith(SESSION_COOKIE_NAME))
      ?.split("=")[1];

    if (value) {
      sessionCookie = value;
    } else {
      sessionCookie = crypto.randomUUID();
    }

    const { client_secret } = await getChatKitSessionToken(sessionCookie);

    return new Response(JSON.stringify({ client_secret }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `${SESSION_COOKIE_NAME}=${sessionCookie}; Path=/; Max-Age=${SESSION_COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax`,
      },
    });
  } catch (error) {
    console.error("Create session error", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
