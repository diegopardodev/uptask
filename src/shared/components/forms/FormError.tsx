type Props = {
    children: React.ReactNode;
};

export function FormError({ children }: Props) {
    return (
        <p className="mt-2 text-sm text-red-600">
            {children}
        </p>
    );
}
