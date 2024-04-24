import { FileVariation, getFilePath } from "@/files/file-paths";
import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

const getFileStream = (path: string) => {
  const readStream = createReadStream(path);
  return new ReadableStream({
    start: (controller) => {
      readStream.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk))
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
    variation: FileVariation;
  };
} & Response;

export const GET = async (req: NextRequest, res: RouteResponse) => {
  try {
    const path = getFilePath(res.params.variation, res.params.id);
    const stats = await stat(path);
    const stream = getFileStream(path);

    return new NextResponse(stream, {
      headers: new Headers({
        "content-type": "image/jpeg",
        "content-length": "" + stats.size,
      }),
    });
  } catch (e) {
    return new NextResponse(null, { status: 404 });
  }
};
