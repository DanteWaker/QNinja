FROM node:14 as base

ARG USER=node
ARG WORKDIR=/home/${USER}/qninja/next

# Set up user environment
USER ${USER}

# Setting up working directory
RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

##### IMAGE : DEVELOPMENT #####
FROM base as next-dev

ARG USER=node

# Copying files
COPY --chown=${USER}:users ./next ./

# Copying entrypoint
USER root
COPY --chown=${USER}:users ./docker/next-entrypoint.sh /
RUN sed -i 's/\r//g' /next-entrypoint.sh
ENTRYPOINT ["sh", "/next-entrypoint.sh"]
USER ${USER}

##### IMAGE : PRODUCTION #####
FROM base as next-prod

ARG USER=node

# Copying requirements
COPY --chown=${USER}:users ./next/package.json ./

# Installing node dependencies
RUN yarn install

# Copying files
COPY --chown=${USER}:users ./next ./

# Build
RUN yarn build

# Copying entrypoint
USER root
COPY --chown=${USER}:users ./docker/next-entrypoint.sh /
RUN sed -i 's/\r//g' /next-entrypoint.sh
ENTRYPOINT ["sh", "/next-entrypoint.sh"]
USER ${USER}
