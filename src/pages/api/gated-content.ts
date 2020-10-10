import dns from 'dns';
import { NextApiRequest, NextApiResponse } from 'next';

import { getArticle, parseArticle } from '@/lib/api';

export default async function exit(req: NextApiRequest, res: NextApiResponse) {
  // Handle potential Googlebot request.
  const isGoogleAgent = req.headers?.['user-agent']?.toLowerCase()?.includes('googlebot') ?? false;

  if (isGoogleAgent) {
    let verified = false;

    try {
      // Verify Googlebot via reverse DNS lookup.
      const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string | undefined;
      verified = await verifyGooglebot(ip);
    } catch (error) {
      return res.status(400).send({ message: 'Attempted Googlebot spoof.' });
    }

    if (!verified) {
      return res.status(400).send({ message: 'Attempted Googlebot spoof.' });
    }

    return await respondWithContentForSlug(req, res);
  }

  // Otherwise validate input data.
  const accessControl = req.body.accessControl;

  if (!accessControl) {
    return res.status(400).send({ message: 'Invalid accessControl data.' });
  }

  // Fetch content for gated article.
  return await respondWithContentForSlug(req, res);
}

/**
 * Retrieve and respond with content for slug.
 * @param req
 * @param res
 */
async function respondWithContentForSlug(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.body.slug;

  if (!slug) {
    return res.status(400).send({ message: 'Invalid slug data.' });
  }

  const response = await getArticle(slug, false);
  const articleModel = parseArticle(response.firstItem, response.linkedItems);

  if (!articleModel) {
    return res.status(404).send({ message: 'Could not retrieve article data.' });
  }

  return res.status(200).send({
    body: articleModel?.body,
  });
}

/**
 * Verify IP address as a Googlebot.
 * @param ip The IPv4 or IPv6 address to be verified.
 * @see https://support.google.com/webmasters/answer/80553?hl=en
 * @see https://github.com/jcowley/googlebot-verify/blob/master/index.js
 */
async function verifyGooglebot(ip: string | undefined): Promise<boolean> {
  if (!ip) {
    return false;
  }

  console.log('[Debug] ip', ip);

  return new Promise<boolean>((resolve, reject) => {
    dns.reverse(ip, (err, hostnames) => {
      if (err) {
        console.log('[Debug] Failed to resolve ip');
        return reject(err);
      }

      console.log('[Debug] hostnames', hostnames);

      if (!hostnames?.length) {
        return resolve(false);
      }

      const tld = hostnames[0]?.split('.')?.slice(-2, -1)?.[0];

      console.log('[Debug] tld', tld);

      if (tld === 'google' || tld === 'googlebot') {
        return resolve(true);
      }

      return resolve(false);
    });
  });
}
