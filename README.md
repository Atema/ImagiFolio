# ImagiFolio

<img src="src/app/icon.svg" alt="ImagiFolio icon" width="200" />

A self-hosted photo gallery to store, view, and share your pictures.

Built as part of a Personal Persuit at the University College Twente. See
<https://webtechnologies.atema.one> for more info

## Configuration

The application is configured using the environment variables listed below.

### Environment variables

#### `DATABASE_URL`

URL to the database with the format
`postgresql://{user}:{password}@{host}:{port}/db?schema={schema}`.

#### `SESSION_SECRET`

String used for encrypting sessions. Should be kept secret.

#### `IMAGE_DIR`

Directory that will be used for storing images. Can instead be defined per image
type using `IMAGE_DIR_ORIGINALS`, `IMAGE_DIR_PREVIEWS` and
`IMAGE_DIR_THUMBNAILS`.

#### `IMAGE_DIR_ORIGINALS`

Directory that will be used for storing original images. As access is generally
infrequent, these could be stored on slower storage. Overrides `IMAGE_DIR`.

#### `IMAGE_DIR_PREVIEWS`

Directory that will be used for storing large preview images. Overrides
`IMAGE_DIR`.

#### `IMAGE_DIR_THUMBNAILS`

Directory that will be used for storing thumbnail images shown in overviews. As
access to these is most frequent, these should be stored on faster storage.
Overrides `IMAGE_DIR`.

### Environment variables (development)

These variables are only meant for use during development.

#### `SEED_IMAGE_DIR`

When defined, this directory is used to seed the system with images. The
directory should contain a structure `{album name}/{photo name}.jpg`. When
resetting the database, these albums and photos will be imported into the
database.
