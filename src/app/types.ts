import { Metadata } from "next";
import { NextResponse } from "next/server";
import { FC, ReactNode } from "react";

export type AppPage<Params = {}> = FC<{
  params: Params;
}>;

export type AppLayout<Params = {}> = FC<{
  children: ReactNode;
  params: Params;
}>;

export type AppResponse<Params = {}> = {
  params: Params;
} & NextResponse;

export type MetadataGenerator<Params = {}> = ({
  params,
}: {
  params: Params;
}) => Promise<Metadata>;
