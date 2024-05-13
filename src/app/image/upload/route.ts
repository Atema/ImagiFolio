import { processPhoto } from "@/files/convert-photo";
import { getUploadPath } from "@/files/file-paths";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { zfd } from "zod-form-data";

/** Schema to verify formdata sent via a post request */
const postSchema = zfd.formData({
  albumId: zfd.text(z.string().uuid()),
  file: zfd.file(),
});

/**
 * Handles POST requests to the upload route. Processes an uploaded image file
 * and adds it to the given album
 *
 * @param req - The incoming request
 * @returns JSON response with the id of the added image, or an error otherwise
 */
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
