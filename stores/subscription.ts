import { toast } from "@/components/ui/use-toast";
import { getUserSubscriptionStatus } from "@/data/client/profile";
import { SUBCRIPTION_TIER } from "@/types/profiles.type";
import { create } from "zustand";

type SubscriptionStore = {
  isPremium: boolean;
  isLoading: boolean;
  setisLoading: (value: boolean) => void;
  setIsPremium: (vaule: boolean) => void;
  fetchSubscriptionStatus: () => Promise<void>;
};
export const useSubscription = create<SubscriptionStore>((set) => ({
  isPremium: false,
  isLoading: false,
  setisLoading: (isLoading) => {
    set({ isLoading });
  },
  setIsPremium: (isPremium) => {
    set({ isPremium });
  },
  fetchSubscriptionStatus: async () => {
    set({ isLoading: true });
    try {
      const { status, error } = await getUserSubscriptionStatus();
      if (error) {
        set({
          isPremium: false,
        });
      } else {
        set({
          isPremium: status === SUBCRIPTION_TIER.PREMIUM ? true : false,
        });
      }
    } catch (error: unknown) {
      toast({
        title: "Failed to Fetch Subscription",
        description: error instanceof Error ? error.message : String(error),
      });
    } finally {
      set({ isLoading: false }); // Stop loading on error
    }
  },
}));
