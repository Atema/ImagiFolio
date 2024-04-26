import { Metadata } from "next";
import { NextResponse } from "next/server";
import { FC, ReactNode } from "react";

export type AppPage<Params = object> = FC<{
  params: Params;
}>;

export type AppLayout<Params = object> = FC<{
  children: ReactNode;
  params: Params;
}>;

export type AppResponse<Params = object> = {
  params: Params;
} & NextResponse;

export type MetadataGenerator<Params = object> = ({
  params,
}: {
  params: Params;
}) => Promise<Metadata>;
