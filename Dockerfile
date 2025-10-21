### BUILDER IMAGE ###
FROM docker.io/superseriousbusiness/masto-fe-standalone-woodpecker-build:0.1.0 AS builder

# Prepare the build directory, copy
# relevant source + config files over.
WORKDIR /build
COPY --chown=node:node app /build/app
COPY --chown=node:node config /build/config
COPY --chown=node:node public /build/public
COPY --chown=node:node \
    .browserslistrc \
    babel.config.js \
    jsconfig.json \
    package.json \
    tsconfig.json \
    yarn.lock \
    /build/

# Create a production build of the frontend.
RUN yarn && yarn build:production

### RUNTIME IMAGE ###
FROM nginx:alpine AS runtime

# Copy bigger nested stuff.
COPY --from=builder /build/public/packs/js/flavours/glitch /usr/share/nginx/html/packs/js/flavours/glitch

# Copy remaining files.
COPY --from=builder /build/public /usr/share/nginx/html/

# Set up nginx.
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
