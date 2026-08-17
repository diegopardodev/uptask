import Spinner from "../ui/Spinner";

type Props = {
    children: React.ReactNode;
    loading?: boolean;
};

export function FormSubmit({ children, loading = false }: Props) {
    return (
        <button disabled={loading} type="submit" className="bg-primary-500 hover:bg-primary-600 hover:cursor-pointer transition-colors ease-in-out duration-300 text-white text-center font-bold w-full py-2 px-5 rounded-md disabled:cursor-not-allowed disabled:bg-primary-400 h-fit flex justify-center gap-3">
            {loading && <Spinner />}
            {children}
        </button>
    );
}
