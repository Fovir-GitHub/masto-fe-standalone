### BUILDER IMAGE ###
FROM node:lts-alpine AS builder

# Prepare the build directory, copy
# relevant source + config files over.
WORKDIR /build
COPY app /build/app
COPY config /build/config
COPY public /build/public
COPY \
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
FROM nginx:1.27.3-alpine AS runtime

# Copy bigger nested stuff.
COPY --from=builder /build/public/packs/js/flavours/glitch /usr/share/nginx/html/packs/js/flavours/glitch
COPY --from=builder /build/public/packs/js/flavours/vanilla /usr/share/nginx/html/packs/js/flavours/vanilla

# Copy remaining files.
COPY --from=builder /build/public /usr/share/nginx/html/

# Set up nginx.
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
