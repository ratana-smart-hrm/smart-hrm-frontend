"use client";

import { IEmployee } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutateEmployee } from "@/stores/admin/useMutateEmployee";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  empCode: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  firstNameKh: z.string().min(1).optional(),
  lastNameKh: z.string().min(1).optional(),
  position: z.string().optional(),
  gender: z.string(),
  status: z.string(),
  joinedDate: z.string().min(1, "Joined date is required"),
});

interface Props {
  initialData?: IEmployee | null;
  formRef: React.RefObject<HTMLFormElement | null>;
  setIsLoading: (loading: boolean) => void;
}

const EmployeeForm = ({ formRef, initialData, setIsLoading }: Props) => {
  const router = useRouter();

  const isEdit = !!initialData;

  const defaultValues = {
    empCode: initialData?.empCode ?? "",
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    firstNameKh: initialData?.firstNameKh ?? "",
    lastNameKh: initialData?.lastNameKh ?? "",
    gender: initialData?.gender ?? "",
    status: initialData?.status ?? "MALE",
    joinedDate: initialData?.joinedDate
      ? initialData?.joinedDate
      : new Date().toString(),
    position: initialData?.position ?? "",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { create: createEmployeeMutate, update: updateEmployeeMutate } =
    useMutateEmployee();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (isEdit) {
      await updateEmployeeMutate(
        { employeeId: initialData.id, request: values },
        {
          onSuccess: () => {
            router.push("/admin/employees");
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } else {
      await createEmployeeMutate(
        { request: values },
        {
          onSuccess: () => {
            router.push("/admin/employees");
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
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="empCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter employee code"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter last name"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="firstNameKh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name Kh</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name kh"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastNameKh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name Kh</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter last name kh"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter position"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="joinedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Joined Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <data value="">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="RESIGNED">Resigned</SelectItem>
                      <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </data>
      </form>
    </Form>
  );
};

export default EmployeeForm;
