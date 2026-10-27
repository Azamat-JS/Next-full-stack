"use server";

import { Board, Column, JobApplication } from "@/app/models";
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

    const board = await Board.findOne({
        _id: boardId,
        userId: session.user.id,
    }
    );

    if (!board) {
        return { error: "Board not found" }
    }

    const maxOrder = (await JobApplication.findOne({ columnId }).sort({ order: -1 }).select("order").lean()) as { order: number } || null;

    const jobApplication = await JobApplication.create({
        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        tags: tags || [],
        description,
        status: 'applied',
        order: maxOrder ? maxOrder.order + 1 : 0,
    });

    await Column.findByIdAndUpdate(columnId, {
        $push: { jobApplication: jobApplication._id }
    });

    return { data: jobApplication }
}