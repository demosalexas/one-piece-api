import { NextResponse } from "next/server";
import { supabase } from "@/supabase/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 20;

  const isActiveParam = url.searchParams.get("isActive");
  const isActive =
    isActiveParam === null ? undefined : isActiveParam.toLowerCase() === "true";

  const sortParam = url.searchParams.get("sort");

  let query = supabase.from("bounties").select("*, characters(name)");

  if (isActive !== undefined) {
    query = query.eq("is_active", isActive);
  }

  if (sortParam === "high") {
    query = query
      .order("amount", { ascending: false })
      .order("created_at", { ascending: false });
  } else if (sortParam === "low") {
    query = query
      .order("amount", { ascending: true })
      .order("created_at", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query.range(
    (page - 1) * limit,
    page * limit - 1,
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
