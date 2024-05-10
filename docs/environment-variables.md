# Environment variables

ImagiFolio supports several environment variables for configuration, which are
listed below.

## `DATABASE_URL`

URL to the PostgreSQL database with the format
`postgresql://user:password@host:port/database`.

The complete options are described in the
[Prisma documentation](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-url).

## `SESSION_SECRET`

Random string used for encrypting session cookies. Should be kept secret. Can,
for example, be generated using `openssl`:

```sh
openssl rand -base64 32
```

## `IMAGE_DIR`

Directory that will be used for storing images. Can instead be defined per image
type using `IMAGE_DIR_ORIGINALS`, `IMAGE_DIR_PREVIEWS` and
`IMAGE_DIR_THUMBNAILS`.

## `IMAGE_DIR_ORIGINALS`

Directory that will be used for storing original images. As access is generally
infrequent, these could be stored on slower storage. Overrides `IMAGE_DIR`.

## `IMAGE_DIR_PREVIEWS`

Directory that will be used for storing large preview images. Overrides
`IMAGE_DIR`.

## `IMAGE_DIR_THUMBNAILS`

Directory that will be used for storing thumbnail images shown in overviews. As
access to these is most frequent, these should be stored on faster storage.
Overrides `IMAGE_DIR`.

## `SEED_IMAGE_DIR`

The directory that will be used for seeding the application with images. See
[seeding the database](seeding-database.md) for more information.

## `SEED_TYPE`

The method that is used for including images from the seeding directory into the
image directory. One of `copy` (default; copy the items into place), `rename`
(move the items into place), `hardlink` (create a hard link to the item), or
`symlink` (create a soft link to the item). See
[seeding the database](seeding-database.md) for more information.
