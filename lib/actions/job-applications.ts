"use server";

import { Board } from "@/app/models";
import { getSession } from "../auth/auth";
import connectDB from "../db";

interface JobApplicationData {
    company: string;
    position: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    tags?: string[];
    description?: string;
    columnId: string;
    boardId: string;
}

export async function createJobApplication(data: JobApplicationData) {
    const session = await getSession();

    if (!session?.user) {
        return { error: "Unauthorized" }
    }

    await connectDB();

    const {
        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        tags,
        description
    } = data;

    if (!company || !position || !columnId || !boardId) {
        return { error: "Missing required fields" };
    }

    // Verify board ownership
    const board = await Board.findOne({
        _id: boardId,
        userId: session.user.id,
    }
    );

    if (!board) {
        return { error: "Board not found" }
    }
}