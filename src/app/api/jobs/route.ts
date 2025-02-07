import { createClient } from "@/lib/supabse/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabaseApi = createClient();
  const { searchParams } = new URL(req.url);

  // Extract query parameters
  const pageParam = parseInt(searchParams.get("pageParam") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);
  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const bookmarked = searchParams.get("bookmarked") === "true";
  const minSalary = parseFloat(searchParams.get("minSalary") || "0");
  const maxSalary = parseFloat(searchParams.get("maxSalary") || "0");

  try {
    // Build the query
    let query = supabaseApi
      .from("jobs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply filters
    if (bookmarked) query = query.eq("bookmarked", true);
    if (title && title !== "null")
      query = query.ilike("title", `%${title.trim()}%`);
    if (location && location !== "null") {
      query = query.ilike(
        "candidate_required_location",
        `%${location.trim()}%`
      );
    }
    if (minSalary > 0) query = query.gte("salary", minSalary);
    if (maxSalary > 0) query = query.lte("salary", maxSalary);

    // Execute the query to get count
    const { count: filteredCount, error: countError } = await query;
    if (countError) {
      console.error("Count error:", countError.message);
      return NextResponse.json({ error: countError.message }, { status: 400 });
    }

    // Calculate total pages
    const totalPages = filteredCount ? Math.ceil(filteredCount / pageSize) : 0;

    // Handle out-of-range pages
    if (pageParam > totalPages) {
      return NextResponse.json({
        success: true,
        jobsData: { jobs: [], totalPages, page: pageParam },
        message: "No jobs found on this page",
        statusCode: 200,
      });
    }

    // Apply pagination
    const start = (pageParam - 1) * pageSize;
    const end = start + pageSize - 1;

    // Re-run the query with range applied
    const { data: paginatedData, error: paginationError } = await query.range(
      start,
      end
    );
    if (paginationError) {
      console.error("Pagination error:", paginationError.message);
      return NextResponse.json(
        { error: paginationError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          jobs: paginatedData || [],
          totalPages,
          page: pageParam,
        },
        message: "Jobs fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to get records" },
      { status: 500 }
    );
  }
}
