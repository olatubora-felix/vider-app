import { createClient } from "@/lib/supabse/client";
import { NextResponse } from "next/server";
type Params = Promise<{ savedJobId: string }>;
export async function PUT(req: Request, { params }: { params: Params }) {
  const supabase = createClient();
  try {
    const { savedJobId } = await params;
    const payload: Payload = await req.json();

    if (!savedJobId) {
      return NextResponse.json(
        { success: false, message: "Job Id not found" },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("jobs")
      .update({ bookmarked: payload?.bookmarked })
      .eq("id", savedJobId)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data, message: "Saved Jobs fetched Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to create record: ${(error as Error).message}`,
        success: false,
      },
      { status: 500 }
    );
  }
}

export interface Payload {
  bookmarked: boolean;
}
