FROM python:3.8

ARG UID=1000
ARG USER=python
ARG WORKDIR=/home/${USER}/qninja/api

# Create user
RUN useradd -l -m -s /bin/bash -N -u ${UID} ${USER}

# Set up user environment
USER ${USER}

# Setting up working directory
RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

# Adding user bin folder to path
ENV PATH /home/${USER}/.local/bin:$PATH

# Installing python dependencies
COPY --chown=${USER}:users ./requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copying files
COPY --chown=${USER}:users ./api/ ./

# Copying entrypoint
USER root
COPY --chown=${USER}:users ./docker/api-entrypoint.sh /
RUN sed -i 's/\r//g' /api-entrypoint.sh
ENTRYPOINT ["sh", "/api-entrypoint.sh"]
USER ${USER}
