"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ICategory } from "@/types/admin";
import { useMutateCategory } from "@/stores/admin/useMutateCategory";
import { useState } from "react";
import { LoadingButton } from "@/components/LoadingButton";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isActive: z.boolean(),
});

interface Props {
  initialData?: ICategory;
  onSuccess: () => void;
}

export default function CategoryForm({ initialData, onSuccess }: Props) {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? { name: "", isActive: true },
  });

  const { create: createCategoryMutate, update: updateCategoryMutate } =
    useMutateCategory();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (isEdit) {
      await updateCategoryMutate(
        { categoryId: initialData.id, request: values },
        {
          onSuccess: () => {
            onSuccess();
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } else {
      await createCategoryMutate(
        { request: values },
        {
          onSuccess: () => {
            onSuccess();
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
                <FormDescription>Display in website</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <LoadingButton loading={isLoading} type="submit">
          {isEdit ? "Save" : "Create"}
        </LoadingButton>
      </form>
    </Form>
  );
}
