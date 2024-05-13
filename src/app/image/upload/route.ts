import { processPhoto } from "@/files/convert-photo";
import { getUploadPath } from "@/files/file-paths";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { zfd } from "zod-form-data";

const postSchema = zfd.formData({
  albumId: zfd.text(z.string().uuid()),
  file: zfd.file(),
});

export const POST = async (req: NextRequest) => {
  const { success, data } = await postSchema.safeParseAsync(
    await req.formData(),
  );

  if (!success)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const uploadPath = getUploadPath();

  try {
    const buffer = Buffer.from(await data.file.arrayBuffer());
    await writeFile(uploadPath, buffer);
    const id = await processPhoto(data.albumId, uploadPath, data.file.name);

    return NextResponse.json({ id });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return new NextResponse(null);
};
