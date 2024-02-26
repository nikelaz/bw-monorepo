<img src="https://i.imgur.com/lX2NzV2.png" alt="budget warden logo" width="320" height="81" style="margin-bottom: 10px;"/>

# Budget Warden Monorepo

## Summary

This is the monorepo for the Budget Warden project (a personal finance tracking application). This entire project is currently in progress and its development is documented in a YouTube series. If you are interested you can explore the videos in the list below:

### YouTube Series

1. [**Software Architecture**](https://youtu.be/Z3OEsK2fUl8)
2. [**UI/UX Design**](https://youtu.be/D_TpsGgVdwY)
3. [**TypeORM Models and Validation**](https://youtu.be/BxH9NYMuTrU)
4. [**Fastify User Authentication with JWT**](https://youtu.be/vVF8Szpx8Ho)

## Submodules

This repository includes two submodules:

- [**bw-backend-service**](https://github.com/nikelaz/bw-backend-service)
- [**bw-web-client**](https://github.com/nikelaz/bw-web-client)

Make sure to pull with the recursive submodules option:

```
git pull --recurse-submodules
```

or 

```
git submodule update --recursive
```

## Dependencies

This project contains Node.js submodules and a docker-compose.yml file for development. To develop and avoid syntax highlighting in most editors you still need to install the NPM dependencies locally. For that make sure you have Node.js installed. The recommended version is `20.11.1 LTS`.

You will also need docker and docker-compose installed. On a Windows/Mac system you can just install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

## Installation

To install all NPM dependencies locally just run:

```
npm install
```

The specified pre-install script will go into the directories of the submodules and run `npm install` locally. **Note!** if you haven't pulled the submodules this script fill fail! Check section **Submodules** for more details.

## Running

To run the docker-compose services you can use

```
docker-compose up
```

Currently the docker-compose.yml file is ONLY setup for development. The *bw-backend-service* and *bw-web-client* will watch for local changes and restart. Do not copy this setup for deployment in production!

## Contributing

At this stage pull requests/contributions will not be accepted, as the project is being developed as part of a YouTube series and there is a strict plan by which the initial development will be done. If you wish to suggest changes during this stage you can leave a comment in one of the YouTube videos.

After the YouTube series is finished the repository will be open for contributions and I will update the guidelines.
