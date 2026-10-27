"use server";

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

export async function createJobApplication(data: JobApplicationData) { }