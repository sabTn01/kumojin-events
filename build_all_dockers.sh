#!/bin/sh
# REF : https://medium.com/travis-on-docker/how-to-version-your-docker-images-1d5c577ebf54


# STEP 1 - Defining constants
NOW="$(date +"%Y%m%d-%H%M")"
GIT_SHORT_COMMIT_HASH="$(git rev-parse --short HEAD)"
IMAGE_TAG="$(printf '%s.%s' "$NOW" "$GIT_SHORT_COMMIT_HASH")"

#dockerstationben02/stationtest01
IMAGE_REPOSITORY="$1"
IMAGE_NAME_BACKEND='kumojin.event.backend'
IMAGE_NAME_FRONTEND='kumojin.event.backend'

IMAGE_BACKEND_FULL_TAG="$(printf '%s:%s' "$IMAGE_REPOSITORY" "$IMAGE_NAME_BACKEND"."$IMAGE_TAG")"
IMAGE_FRONTEND_FULL_TAG="$(printf '%s:%s' "$IMAGE_REPOSITORY" "$IMAGE_NAME_FRONTEND"."$IMAGE_TAG")"

# STEP 2 - Saying Hello!
printf "Starting to build Docker Station Test Image welcome aboard!\n"
printf 'Images will be created using tag: %s    \n' "$IMAGE_FULL_TAG"

# STEP 3 - Build all images
docker build --rm --no-cache -t $IMAGE_BACKEND_FULL_TAG -f Backend.Dockerfile .
docker build --rm --no-cache -t $IMAGE_FRONTEND_FULL_TAG -f Frontend.Dockerfile .

# STEP 4 - Push all images
docker push $IMAGE_BACKEND_FULL_TAG
docker push $IMAGE_FRONTEND_FULL_TAG

printf "Completed :) Have a safe day!\n"
