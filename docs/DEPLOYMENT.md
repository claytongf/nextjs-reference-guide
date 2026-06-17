# Deployment

This project is self-hosted: clone-and-run locally with Docker, and ship to
your own cloud server via GitHub Actions. It is **not** tied to Vercel.

## Run locally with Docker

```bash
docker compose up --build
# open http://localhost:3000
```

This builds the Next.js `standalone` output (configured in `next.config.ts`)
into a minimal production image and runs `node server.js`.

For day-to-day development, prefer the native dev server instead:

```bash
npm install
npm run dev
```

## Continuous integration

`.github/workflows/ci.yml` runs on every push/PR to `main`:
lint → typecheck → unit tests → build.

## Continuous deployment

`.github/workflows/deploy.yml` runs on push to `main`:

1. Builds a Docker image and pushes it to GitHub Container Registry (GHCR) as
   `ghcr.io/<owner>/<repo>:latest` and `:<sha>`.
2. SSHes into your server, pulls the new image, and restarts the container.

### One-time server setup

1. Install Docker + the Compose plugin on the server.
2. Copy `docker-compose.prod.yml` to a directory on the server (e.g.
   `/opt/nextjs-reference/docker-compose.yml`) and replace `OWNER/REPO` with
   your repository path.
3. Ensure the server can pull from GHCR (the deploy workflow logs in for you).

### Required GitHub repository secrets

| Secret            | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `SSH_HOST`        | Server hostname or IP                              |
| `SSH_USER`        | SSH login user                                     |
| `SSH_PRIVATE_KEY` | Private key authorized on the server               |
| `DEPLOY_PATH`     | Directory on the server with `docker-compose.yml`  |

`GITHUB_TOKEN` is provided automatically and used to push/pull from GHCR.
