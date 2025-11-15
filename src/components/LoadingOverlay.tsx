import { Loader2 } from "lucide-react";

interface Props {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
}

export const LoadingOverlay = ({
  isLoading,
  message = "Loading...",
  fullScreen = false,
}: Props) => {
  if (!isLoading) return null;

  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0" : "absolute inset-0"
      } bg-black/50 flex items-center justify-center z-50`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};
