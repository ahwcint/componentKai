'use server';

import { prisma } from '../prismaClient';
import { createUserRequestApi } from './type/user.type';

export async function GET(request: Request) {
  const payload: any = await request.json();
  const data = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });
  return Response.json(data);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const payload: createUserRequestApi = await request.json();
    const data = await prisma.user.create({ data: payload });
    return Response.json(data);
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
}
