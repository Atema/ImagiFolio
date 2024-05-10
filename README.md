# ImagiFolio

<img src="src/app/icon.svg" alt="ImagiFolio icon" width="200" />

ImagiFolio is a self-hosted photo gallery web application where users can store,
view and share pictures with each other.

It was built as part of a Personal Persuit at the University College Twente. See
<https://webtechnologies.atema.one> for more info

## Installation

ImagiFolio can be installed from the source in this repository be following the
steps below.

### Requirements

- A server with Node.js 20 (other versions may work, but are untested).
- The [`pnpm`](https://pnpm.io) package manager (`npm` and `yarn` should work,
  but the commands below should be changed accordingly)
- A PostgreSQL database and user that has full permissions on the database.

### Getting the source and installing dependencies

```sh
git clone https://github.com/Atema/ImagiFolio.git
cd ImagiFolio
pnpm install
```

### Configuration

ImagiFolio is configured through environment variables. These can be defined by
following usual operating system procedures or by creating a `.env` file with
the following content:

```sh
DATABASE_URL="postgresql://user:password@host:5432/database"
SESSION_SECRET="a long unique secret string"
IMAGE_DIR="/path/to/image/directory"
```

These should be enough for many basic configurations, but additional tweaks are
possible through the options described in
[environment variables](docs/environment-variables.md).

### Building

```sh
pnpm build
```

This step can take a while, and will create all neccessary files for running the
application.

### Creating the database tables

```sh
pnpm db-push
```

This command will create or update all tables necessary in the database.

There is some functionality (generally intended for development purposes) to
pre-fill an empty database with sample data. See
[seeding the database](docs/seeding-database.md)

### Starting

```sh
pnpm start
```

By default, this will start the application at `http://localhost:3000`.
Alternatively, the port can be changed by using the `-p 1234` option flag.

## Updating

To update ImagiFolio to the newest version, stop the application. Then fetch the
latest source, and follow the installation steps to re-build the application:

```sh
git pull
pnpm install
pnpm build
pnpm db-push
pnpm start
```
