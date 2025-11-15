import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Prop {
  title: string;
  description: string;
  backButtonHref?: string;
}

const Heading = ({ title, description, backButtonHref }: Prop) => {
  return (
    <div className="flex items-center gap-3">
      {backButtonHref && (
        <Link href={backButtonHref}>
          <button className="bg-gray-200 h-12 w-10 rounded flex items-center justify-center hover:bg-gray-300">
            <ArrowLeft className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Back</span>
          </button>
        </Link>
      )}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;