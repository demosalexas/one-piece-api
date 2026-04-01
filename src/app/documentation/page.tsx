import { ArrowLeft, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Documentation",
  description: "How to use the One Piece API: REST basics and examples.",
};

export default function DocumentationPage() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Logo />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft data-icon="inline-start" />
              Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 md:px-6 md:py-14">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="size-5" aria-hidden />
            <span className="text-xs font-medium uppercase tracking-wide">
              Docs
            </span>
          </div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            API documentation
          </h1>
          <p className="max-w-2xl text-sm/relaxed text-muted-foreground md:text-base/relaxed">
            The One Piece API exposes REST resources for characters and related
            data. Use the endpoints below as a starting point; query parameters
            like pagination follow the patterns returned by each route.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Characters</CardTitle>
            <CardDescription>
              Paginated list of characters from the dataset.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-muted-foreground">
            <p>
              <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.625rem] text-foreground">
                GET /api/characters
              </code>
            </p>
            <p>
              Optional query:{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.625rem] text-foreground">
                ?page=
              </code>{" "}
              (1-based page index).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
            <CardDescription>
              In production, requests are served from the deployed host.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Replace the host with your deployment URL or{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.625rem] text-foreground">
                http://localhost:3000
              </code>{" "}
              during local development.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
