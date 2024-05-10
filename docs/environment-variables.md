# Environment variables

ImagiFolio supports several environment variables for configuration, which are
listed below.

## `DATABASE_URL`

A URL to connect to the PostgreSQL database. It should have the following
format:

```text
postgresql://user:password@host:port/database
```

The complete options are described in the
[Prisma documentation](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-url).

## `SESSION_SECRET`

Random string used for encrypting session cookies. To keep the application
secure, it must be kept a secret. It can be generated, for example, using:

```sh
openssl rand -base64 32
```

## `IMAGE_DIR`

The directory that will be used for storing images.

Instead, it can also be specfied per image type by using `IMAGE_DIR_ORIGINALS`,
`IMAGE_DIR_PREVIEWS` and `IMAGE_DIR_THUMBNAILS`, which will override this
option.

## `IMAGE_DIR_ORIGINALS`

The directory that will be used for storing images in their original quality. As
access to these is generally infrequent, this directory could be on a slower
type of storage.

## `IMAGE_DIR_PREVIEWS`

The directory that will be used for storing larger preview images. Ideally, this
directory should be stored on faster storage.

## `IMAGE_DIR_THUMBNAILS`

The directory that will be used for storing thumbnail images that are shown in
overviews. As access to these is most frequent, this directory should be stored
on faster storage.

## `SEED_IMAGE_DIR`

The directory that will be used for seeding the application with images. See
[seeding the database](seeding-database.md) for more information.

## `SEED_TYPE`

The method that is used for taking images from the seeding directory into the
image directory. One of `copy` (default; copy the items into place), `rename`
(move the items into place), `hardlink` (create a hard link to the item), or
`symlink` (create a soft link to the item). See
[seeding the database](seeding-database.md) for more information.
