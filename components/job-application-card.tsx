import { Column, JobApplication } from "@/app/models/models.types"

interface JobApplicationCardProps {
    job: JobApplication,
    columns: Column[],
}

const JobApplicationCard = ({ job, columns }: JobApplicationCardProps) => {
    return (
        <div>JobApplicationCard</div>
    )
}

export default JobApplicationCard