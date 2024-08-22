'use server';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  prisma.$connect();
  const data = await prisma.user.findMany();
  console.log('data', data);
  prisma.$disconnect();
  return Response.json({ data });
}

export async function POST(request: Request): Promise<Response> {
  const payload: User = await request.json();
  try {
    prisma.$connect();
    const data = await prisma.user.create({ data: payload });
    prisma.$disconnect();
    return Response.json(
      {
        message: 'create username success',
        status: 'success',
        data,
      },
      { status: 200 },
    );
  } catch (error: any) {
    let message = 'unknown';
    switch (error.code) {
      case 'P2002':
        message = 'username already existed';
    }
    return Response.json(
      {
        message,
        status: 'failure',
        data: payload,
      },
      { status: 301 },
    );
  }
}
