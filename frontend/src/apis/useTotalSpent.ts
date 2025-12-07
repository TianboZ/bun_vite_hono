import { client } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useTotalSpent = () => {
  return useQuery({
    queryKey: ["total-spent"],
    queryFn: async () => {
      const res = await client.api.expenses["total-spent"].$get();
      console.log("Total spent response:", res);
      if (!res.ok) {
        throw new Error("Failed to fetch total spent");
      }
      const data2 = await res.json();
      return data2;
    },
  });
};
