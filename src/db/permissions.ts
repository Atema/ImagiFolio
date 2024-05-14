import prisma from "./prisma/client";

export const checkAlbumPermission = async (userId: string, albumId: string) =>
  !!(await prisma.album.count({
    where: { id: albumId, ownerId: userId },
    take: 1,
  }));

export const checkPhotoPermission = async (
  userId: string,
  albumId: string,
  photoId: string,
) =>
  !!(await prisma.photo.count({
    where: { id: photoId, albumId, album: { ownerId: userId } },
    take: 1,
  }));

export const checkUserPermission = async (userId: string) =>
  !!(await prisma.user.count({
    where: { id: userId },
    take: 1,
  }));

export const checkAdminPermission = async (userId: string) =>
  !!(await prisma.user.count({
    where: { id: userId, role: "admin" },
    take: 1,
  }));

export const checkCreateAlbumPermission = async (userId: string) =>
  !!(await prisma.user.count({
    where: { id: userId, role: { in: ["admin", "editor"] } },
    take: 1,
  }));
