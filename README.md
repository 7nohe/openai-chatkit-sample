# OpenAI ChatKit Sample

A Next.js sample application demonstrating the integration of [OpenAI ChatKit](https://platform.openai.com/docs/chatkit) with React. This project showcases how to build a conversational AI interface using OpenAI's ChatKit React components.

## Features

- 🤖 **OpenAI ChatKit Integration** - Pre-built chat UI components powered by OpenAI
- ⚡ **Next.js 15** - Built with the latest Next.js App Router and Turbopack
- 🎨 **Tailwind CSS 4** - Modern styling with Tailwind CSS
- 🔐 **Session Management** - Secure session handling with cookie-based authentication
- 📱 **Responsive Design** - Optimized chat interface for various screen sizes
- 🔧 **TypeScript** - Full type safety throughout the application

## Prerequisites

Before you begin, ensure you have the following:

- Node.js 20.x or higher
- An OpenAI API account with ChatKit access
- OpenAI API Key
- ChatKit Workflow ID

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd openai-chatkit-sample
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
CHATKIT_WORKFLOW_ID=your_chatkit_workflow_id_here
```

**Required Environment Variables:**

- `OPENAI_API_KEY` - Your OpenAI API key (get it from [OpenAI Platform](https://platform.openai.com/api-keys))
- `CHATKIT_WORKFLOW_ID` - Your ChatKit workflow ID (create one in the [OpenAI Agent Builder](https://platform.openai.com/agent-builder))

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the chat interface.

## Project Structure

```
openai-chatkit-sample/
├── app/
│   ├── api/
│   │   └── chatkit/
│   │       └── session/
│   │           ├── route.ts              # Session creation endpoint
│   │           └── _libs/
│   │               └── chatkit.ts        # ChatKit API integration
│   ├── components/
│   │   └── Chat.tsx                      # Main chat component
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Home page
│   └── globals.css                       # Global styles
├── public/                               # Static assets
├── biome.json                            # Biome configuration
├── next.config.ts                        # Next.js configuration
├── package.json                          # Dependencies
├── postcss.config.mjs                    # PostCSS configuration
├── tailwindcss.config.ts                 # Tailwind CSS configuration
└── tsconfig.json                         # TypeScript configuration
```

## How It Works

### Session Management

The application implements a session-based authentication flow:

1. **Client Request**: The `Chat` component requests a client secret from `/api/chatkit/session`
2. **Session Cookie**: The server generates or retrieves a session ID stored in an HTTP-only cookie
3. **ChatKit Session**: The server creates a ChatKit session using the OpenAI API
4. **Client Secret**: The client secret is returned to initialize the ChatKit component

### ChatKit Integration

The `Chat` component uses the `@openai/chatkit-react` package:

```tsx
const { control } = useChatKit({
  api: {
    async getClientSecret(existing) {
      const res = await fetch('/api/chatkit/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const { client_secret } = await res.json();
      return client_secret;
    },
  },
});

return <ChatKit control={control} className="h-[720px] w-[640px]" />;
```

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[@openai/chatkit-react](https://platform.openai.com/docs/chatkit)** - OpenAI ChatKit React components
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter

## Customization

### Adjusting Chat Interface Size

Modify the `className` prop in `app/components/Chat.tsx`:

```tsx
<ChatKit control={control} className="h-[720px] w-[640px]" />
```

### Session Cookie Configuration

Adjust session cookie settings in `app/api/chatkit/session/route.ts`:

```typescript
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
```

## Deployment

### Deploy on Vercel

The easiest way to deploy this app is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on [Vercel](https://vercel.com/new)
3. Add your environment variables (`OPENAI_API_KEY` and `CHATKIT_WORKFLOW_ID`)
4. Deploy!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Environment Variables in Production

Make sure to set the following environment variables in your deployment platform:

- `OPENAI_API_KEY`
- `CHATKIT_WORKFLOW_ID`

## Learn More

- [OpenAI ChatKit Documentation](https://platform.openai.com/docs/chatkit)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI Platform](https://platform.openai.com/)
- [@openai/chatkit-react on npm](https://www.npmjs.com/package/@openai/chatkit-react)

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:

- OpenAI ChatKit: [OpenAI Support](https://help.openai.com/)
- Next.js: [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- This Project: Open an issue in this repository
