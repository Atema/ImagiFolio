import prisma from "@/db/prisma/client";
import { FileOriginal, FileVariation, getFilePath } from "@/files/file-paths";
import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

const getFileStream = (path: string) => {
  const readStream = createReadStream(path);

  return new ReadableStream({
    start: (controller) => {
      readStream.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk)),
      );
      readStream.on("end", () => controller.close());
      readStream.on("error", (error: unknown) => controller.error(error));
    },
    cancel: () => {
      readStream.destroy();
    },
  });
};

type RouteResponse = {
  params: {
    id: string;
    variation: FileOriginal | FileVariation;
  };
} & Response;

export const GET = async (_req: NextRequest, { params }: RouteResponse) => {
  try {
    const photo = await prisma.photo.findUniqueOrThrow({
      where: { id: params.id },
      select: { format: true, filename: true },
    });

    const path = getFilePath(params.variation, params.id);
    const stats = await stat(path);
    const stream = getFileStream(path);

    return new NextResponse(stream, {
      headers: new Headers({
        "content-type":
          params.variation == "original"
            ? `image/${photo.format}`
            : "image/jpeg",
        "content-length": "" + stats.size,
        "content-disposition":
          params.variation == "original"
            ? `attachment; filename="${photo.filename || "Photo." + photo.format}"`
            : "inline",
      }),
    });
  } catch (e) {
    return new NextResponse(null, { status: 404 });
  }
};
