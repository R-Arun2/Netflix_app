import prismadb from '@/libs/prismadb';
import { NextApiResponse, NextApiRequest } from "next";
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    await serverAuth(req, res);

    const movies = await prismadb.movie.findMany();

    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
