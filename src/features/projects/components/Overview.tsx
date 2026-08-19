import { formatDate } from "@/src/shared/utils/date";
import { SelectProjectWithManager } from "../types";

type Props = {
    project: SelectProjectWithManager;
};

export default function Overview({project}: Props) {
    const { client, createdAt } = project;

    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-10">
            <div></div>

            <aside className="border border-gray-200 p-5 rounded-md space-y-5 text-sm">
                <p className="font-semibold">Project details</p>
                <div className="flex flex-col items-center justify-between space-y-3">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-gray-500">Client</span>
                        <p className="font-semibold">{client}</p>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <span className="text-gray-500">Created</span>
                        <p className="font-semibold">{formatDate(createdAt)}</p>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <span className="text-gray-500">Manager</span>
                        <p className="font-semibold">{project.manager.name}</p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
