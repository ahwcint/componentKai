import { prisma } from '../../prismaClient';

export async function GET() {
  const data = await prisma.user.findMany();
  return Response.json(data);
}
