import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser()
        
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const analysis = await db.analysis.findUnique({
            where: { 
                id,
                userId: user.id,
            },
        });

        if (!analysis) {
            return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
        }

        await db.analysis.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Analysis deleted successfully." });
    } catch (error) {
        console.error("DELETE_ANALYSIS_ERROR", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}