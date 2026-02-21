export const runtime = 'edge';

interface ChatRequest {
  verseRef: string;
  question: string;
  commentaryContext: string;
  history?: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response('Gemini API key not configured.', { status: 500 });
  }

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid request body.', { status: 400 });
  }

  const { verseRef, question, commentaryContext, history = [] } = body;

  if (!question?.trim()) {
    return new Response('Question is required.', { status: 400 });
  }

  const systemInstruction = `You are a knowledgeable and thoughtful guide helping students study the Bhagavad Gita. You have deep knowledge of Sanskrit, Vedanta philosophy, and the diverse interpretive traditions of the Gita.

You are currently discussing verse ${verseRef}.

The following commentaries from traditional scholars are available for this verse in the study database:

${commentaryContext}

Guidelines:
- Draw primarily from the commentaries above when answering, citing which commentator says what
- Supplement with your broader knowledge of the Gita, Sanskrit, and Vedanta philosophy
- Keep answers clear and accessible — these are students, not necessarily scholars
- Be respectful of the sacred and philosophical nature of the text
- When commentators disagree, point that out — it enriches understanding
- If a student asks in a non-academic way, meet them where they are
- Keep responses focused and reasonably concise unless a detailed explanation is called for`;

  const contents = [
    ...history,
    { role: 'user', parts: [{ text: question }] },
  ];

  const geminiBody = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  };

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', geminiRes.status, errText);
      if (geminiRes.status === 429) {
        return new Response(
          "The AI assistant is resting for a moment — it can only handle so many questions at once. Please wait 30 seconds and try again.",
          { status: 429 }
        );
      }
      return new Response(
        "The AI assistant is temporarily unavailable. Please try again in a moment.",
        { status: 502 }
      );
    }

    // Stream SSE response through to client as plain text
    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiRes.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const text =
                parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                controller.enqueue(new TextEncoder().encode(text));
              }
            } catch {
              // Skip malformed SSE chunks
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    console.error('Chat route error:', err);
    return new Response('Failed to connect to Gemini API.', { status: 503 });
  }
}
