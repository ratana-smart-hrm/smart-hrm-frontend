import { getQueryClient } from "@/lib/query-client";
import { queryKeys } from "@/service/util/query-key";
import { getAllCategories } from "@/service/admin/category.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAllCustomers } from "@/service/admin/customer.service";
import { getAllDevices } from "@/service/admin/device.service";
import DeviceClient from "./components/DeviceClient";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.devices.all(),
    queryFn: ()=> getAllDevices(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DeviceClient />
    </HydrationBoundary>
  );
};

export default page;
