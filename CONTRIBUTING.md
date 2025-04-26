# Contributing to Masto-FE (🦥 flavour)

[Find an issue](https://codeberg.org/superseriousbusiness/masto-fe-standalone/issues), code it up, all day long you'll have good luck!

## Dependencies

To work on the code decently, you should have Node and Yarn installed. To avoid fuckery, Node Version Manager is **highly recommended**: https://github.com/nvm-sh/nvm.

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

## Linting

Stuff needs to pass linting before it gets squerged:

```bash
yarn && yarn lint:js
```
