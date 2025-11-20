"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IContract, IContractType } from "@/types/admin";
import { useState } from "react";
import { useMutateContract } from "@/stores/admin/useMutateContract";
import { LoadingButton } from "@/components/LoadingButton";

const formSchema = z.object({
  employeeId: z.number().min(1, "Employee is required"),
  contractTypeId: z.number().min(1, "Contract type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  baseSalary: z.number().min(0, "Base salary must be positive"),
  contractDetail: z.string().min(1, "Contract detail is required"),
  isExpired: z.boolean(),
});

interface Props {
  initialData?: IContract;
  onSuccess: () => void;
  contractTypes?: IContractType[];
}

export default function ContractForm({
  initialData,
  onSuccess,
  contractTypes = [],
}: Props) {
  const isEdit = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      employeeId: 0,
      contractTypeId: 0,
      startDate: "",
      endDate: "",
      baseSalary: 0,
      contractDetail: "",
      isExpired: false,
    },
  });

  const { create: createContractMutate, update: updateContractMutate } =
    useMutateContract();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (isEdit) {
      await updateContractMutate(
        { contractId: initialData.id, request: values },
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
      await createContractMutate(
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
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter employee ID"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contractTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Type</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id!.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="baseSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Salary</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter base salary"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contractDetail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Detail</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter contract details"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" loading={isLoading}>
          {isEdit ? "Save" : "Create"}
        </LoadingButton>
      </form>
    </Form>
  );
}
