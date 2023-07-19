import serverAuth from '@/libs/serverAuth';
import { NextApiResponse, NextApiRequest } from "next";
import prismadb from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const clientVersion = req.headers['user-agent']; // Get the client version from the user-agent header

  try {
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== 'string' || !movieId) {
      throw new Error('Invalid ID');
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });

    if (!movie) {
      throw new Error('Invalid ID');
    }

    return res.status(200).json({ movie, clientVersion });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
