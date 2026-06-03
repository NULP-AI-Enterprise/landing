// Файл: app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
        const apiKey = process.env.API_KEY || 'your-api-key';

        console.log(`Sending request to: ${backendUrl}/api/chat/llama/v1/reactive`);

        const response = await fetch(`${backendUrl}/api/chat/llama/v1/reactive`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey,
            },
            body: JSON.stringify({ message: body.message }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Backend Error (${response.status}):`, errorText);
            throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
        }

        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        // Тепер у терміналі буде точно видно, що пішло не так
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}