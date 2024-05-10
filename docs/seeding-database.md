# Seeding the database

To aid in development, there is a feature to _seed_ the database with images
from a seeding directory. This behaviour is controlled by the environment
variables `SEED_IMAGE_DIR` and `SEED_TYPE` (see
[environment variables](environment-variables.md)).

Besides creating albums and photographs, the seeding process will also create a
single user with the email `admin@example.com` and password `admin admin`, which
will be the owner of these albums.

## Directory structure

For each album to add to the database, the seeding directory should contain a
folder with the photos of that album. The album will be given the same name as
the folder.

```text
Seed-Directory
├── Album 1
│   ├── image001.jpg
│   ├── image002.jpg
│   ├── ...
├── Album 2
│   ├── photoA.jpg
│   ├── photoB.jpg
│   ├── ...
├── ...
```

## Applying the seed

The seed will be applied automatically when running relevant `prisma` commands
during the development process (see the
[prisma documentation](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#integrated-seeding-with-prisma-migrate)
for more information).

Alternatively, the database can be seeded manually by using the following
command, which should be run after creating the database tables:

```sh
pnpm db-seed
```
