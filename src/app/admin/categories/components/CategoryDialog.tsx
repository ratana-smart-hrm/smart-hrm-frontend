import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/util/query-key";
import { getCategoryById } from "@/service/admin/category.service";
import { LoadingOverlay } from "@/components/LoadingOverlay";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categoryId?: number;
}
const CategoryDialog = ({ isOpen, setIsOpen, categoryId }: Props) => {
  const isEdit = !!categoryId;

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.categories.byId(categoryId),
    queryFn: () => getCategoryById(categoryId),
    enabled: isEdit,
  });

  const category = data?.category ?? undefined;

  if (isFetching) {
    return <LoadingOverlay isLoading={isFetching} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          initialData={category}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
