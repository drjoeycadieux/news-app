import { NextRequest } from 'next/server';
import { yoga } from '../../../lib/graphql';

export async function POST(request: NextRequest) {
  const response = await yoga.handleRequest(request);
  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}

export async function GET(request: NextRequest) {
  const response = await yoga.handleRequest(request);
  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
