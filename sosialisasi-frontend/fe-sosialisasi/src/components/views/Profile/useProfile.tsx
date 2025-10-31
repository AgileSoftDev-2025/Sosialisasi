import { useSession } from "next-auth/react";

const useProfilePage = () => {
  const { data: session } = useSession();
};
