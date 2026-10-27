'use client';

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";


interface CreateJobApplicationDialogProps {
    columnId: string;
    boardId: string;
}
const CreateJobApplicationDialog = ({ columnId, boardId }: CreateJobApplicationDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        notes: "",
        salary: "",
        jobUrl: "",
        tags: "",
        description: "",
    });


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant="outline">
                    <Plus />
                    Add Job
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Job Application</DialogTitle>
                    <DialogDescription>
                        Track a new job application
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company">
                                    Company *
                                </Label>
                                <Input id="company"
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">
                                    Position *
                                </Label>
                                <Input
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    id="position" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">
                                    Location
                                </Label>
                                <Input
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    id="location" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">
                                    Salary
                                </Label>
                                <Input
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    id="salary" placeholder="e.g. $100K - $150K" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="jobUrl">
                                Job URL
                            </Label>
                            <Input
                                value={formData.jobUrl}
                                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                                id="jobUrl" placeholder="https://...." />
                        </div>

                        <div>
                            <Label htmlFor="tags">
                                Tags (comma-separated)
                            </Label>
                            <Input
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                id="tags" placeholder="React, Tailwind, High-paid" />
                        </div>
                        <div>
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                id="description" placeholder="Brief description of the role..." rows={3} />
                        </div>
                        <div>
                            <Label htmlFor="notes">
                                Notes
                            </Label>
                            <Textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                id="notes" rows={4} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Aplication</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateJobApplicationDialog
