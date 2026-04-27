# MyoPREVA Next.js

Production Next.js App Router frontend for MyoPREVA.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run test:run
npm run build
npm audit
```

## Environment

Copy `.env.example` to `.env.local` for local overrides.

```bash
NEXT_PUBLIC_SITE_URL=https://myopreva.com
NEXT_PUBLIC_API_BASE_URL=
```

Do not commit real secrets or AWS credentials. Browser-visible values must use `NEXT_PUBLIC_`.

## Production Runtime

The project builds with Next.js standalone output for container or Node hosting.

```bash
npm ci
npm run build
npm run start
```

For the standalone server used by Docker:

```bash
node .next/standalone/server.js
```

## Docker

```bash
docker build -t myopreva-nextjs:latest .
docker run --rm -p 3000:3000 --env-file .env.local myopreva-nextjs:latest
```

## Recommended AWS Path

Use ECS Fargate or EC2 with the included Dockerfile, then put CloudFront in front for TLS, caching, WAF, and global delivery.

Amplify is convenient for supported Next.js versions, but the current project uses Next.js 16. For static S3 + CloudFront hosting, switch to `output: "export"` and configure static-compatible image handling first.
