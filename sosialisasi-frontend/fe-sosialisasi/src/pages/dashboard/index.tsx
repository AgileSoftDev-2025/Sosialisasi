import DashboardLayout from "@/components/layouts/DashboardLayout";
import Home from "@/components/views/Dashboard/Home";

const HomePage = () => {
  return (
    <DashboardLayout
      title="Detail Banner"
      description="Manage information for this banner."
      type="admin"
    >
      <Home></Home>
    </DashboardLayout>
  );
};

export default HomePage;
