# Masto-FE (🦥 flavour)

This is a fork of [Iceshrimp's Masto-FE Standalone](https://iceshrimp.dev/iceshrimp/masto-fe-standalone) repository, which is itself a fork of [Mastodon Glitch Edition](https://github.com/glitch-soc/mastodon), which in turn forks [Mastodon](https://github.com/mastodon/mastodon/). Phew!

The goal of this repository is to make it possible to smoothly and intuitively use the Mastodon frontend with a GoToSocial instance as the backend.

This mostly means making changes to the frontend to allow it to work with GoToSocial-specific features, making it slightly less Mastodon-y by changing some of the branding, wording, iconography, etc, and fixing other small issues.

There's a version running here that you can try:

https://masto-fe.superseriousbusiness.org

The application doesn't gather or store any information that you give it, including access tokens or passwords, everything just happens in your browser's local storage.

## Building

### Not Docker

You need Node and Yarn installed for this. To avoid fuckery, Node Version Manager is **highly recommended**: https://github.com/nvm-sh/nvm.

Once you've installed Node + Yarn, you can build the whole thingy by running:

```bash
yarn && yarn build:production
```

### Docker (don't need to have Node or Yarn installed)

You can build a docker container for the whole thingy by running (for example):

```bash
docker build -t superseriousbusiness/masto-fe-standalone:0.1.0 .
```

## Deploying

### Not Docker

Serve all the stuff in `public` behind an nginx or whatever you want! See the included `nginx.conf` for one example of how to do this, it's not too bad.

### Docker (definitely the easiest way)

The Docker container is based on Nginx, and serves over port 3000. Just deploy it and listen on that port, preferably with a reverse proxy at some point (Traefik? Caddy? Another Nginx perhaps?) handling https.

## Testing locally, linting, etc

See [CONTRIBUTING.md](./CONTRIBUTING.md)!
