import { z } from "zod";
import { zfd } from "zod-form-data";

export const uuidSchema = zfd.text(
  z
    .string({
      required_error: "An unexpected error occurred: no user id found",
    })
    .uuid({
      message: "An unexpected error occurred: incorrect format of user-id.",
    }),
);
