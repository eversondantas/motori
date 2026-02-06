FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# Enable corepack (pnpm) and set a default pnpm version
RUN corepack enable \
  && corepack prepare pnpm@10.28.2 --activate

# Optional: install additional tooling here if needed
