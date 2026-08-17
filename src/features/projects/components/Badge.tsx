type Props = {
    children: React.ReactNode;
    type?: "collaborator" | "manager"
};

export default function Badge({children, type = "manager"}: Props) {
    return (
        <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 inset-ring inset-ring-gray-200">
            <svg viewBox="0 0 6 6" aria-hidden="true" className={`size-1.5 ${type === "collaborator" ? "fill-green-500" : "fill-primary-500"}`}>
                <circle r={3} cx={3} cy={3} />
            </svg>
            {children}
        </span>
    );
}
