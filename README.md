# Masto-FE (🦥 flavour)

This is a fork of [Iceshrimp's Masto-FE Standalone](https://iceshrimp.dev/iceshrimp/masto-fe-standalone) repository, which is itself a fork of [Mastodon Glitch Edition](https://github.com/glitch-soc/mastodon), which in turn forks [Mastodon](https://github.com/mastodon/mastodon/). Phew!

The goal of this repository is to make it possible to smoothly and intuitively use the Mastodon frontend with a GoToSocial instance as the backend.

This mostly means making changes to the frontend to allow it to work with GoToSocial-specific features, making it slightly less Mastodon-y by changing some of the branding, wording, iconography, etc, and fixing other small issues.

There's a version running here that you can try:

https://masto-fe.superseriousbusiness.org

The application doesn't gather or store any information that you give it, including access tokens or passwords, everything just happens in your browser's local storage.

## Building

### Not Docker (must have Node + Yarn installed)

You can build the whole thingy by running:

```bash
yarn && yarn build:production
```

### Docker (don't need to have Node or Yarn installed)

You can build a docker container for the whole thingy by running (for example):

```bash
docker build -t superseriousbusiness/masto-fe-standalone:0.1.0 .
```

## Testing Locally

You can fairly easily test builds of Masto-FE locally by using Docker and the GoToSocial testrig.

### Build GoToSocial + launch the GtS testrig

First get the GoToSocial repository cloned somewhere:

```bash
mkdir -p ~/go/src/codeberg.org/superseriousbusiness && \
cd ~/go/src/codeberg.org/superseriousbusiness && \
git clone git@codeberg.org:superseriousbusiness/gotosocial && \
cd ~/go/src/codeberg.org/superseriousbusiness/gotosocial
```

In the GtS repo directory, build GoToSocial with `DEBUG=1` to enable the testrig:

```bash
DEBUG=1 ./scripts/build.sh
```

In the GtS repo directory, launch the GoToSocial testrig using the newly built binary, which will bind to port 8080 on localhost:

```bash
DEBUG=1 GTS_LOG_LEVEL=info ./gotosocial testrig start
```

Leave the testrig running.

### Build Masto-FE + run it locally

Now in a *separate* terminal window, get back to the Masto-FE directory, and do a Docker build (this might take a bit of time):

```bash
docker build -t superseriousbusiness/masto-fe-standalone:latest .
```

Deploy Masto-FE locally on port 3000:

```bash
docker run -it -p 3000:80 superseriousbusiness/masto-fe-standalone:latest
```

Open your browser and go to http://localhost:3000.

In the front page, enter `http://localhost:8080` as your domain/instance. **The `http://` part is important, as without it Masto-FE will expect `https`!**

Log in as email `zork@example.org`, password `password`, or `admin@example.org`, password `password`. You can now try posting stuff, viewing timelines, etc.

If you want to reset the testrig state, just stop it and launch it again. All database + storage state will be cleared when it stops, and repopulated when it launches. You will then need to log out of Masto-FE (🦥 flavour) and log back in again to reauthenticate.

## Deploying

### Not Docker

Serve all the stuff in `public` behind an nginx or whatever you want! See the included `nginx.conf` for one example of how to do this, it's not too bad.

### Docker (definitely the easiest way)

The Docker container is based on Nginx, and serves over port 3000. Just deploy it and listen on that port, preferably with a reverse proxy at some point (Traefik? Caddy? Another Nginx perhaps?) handling https.
