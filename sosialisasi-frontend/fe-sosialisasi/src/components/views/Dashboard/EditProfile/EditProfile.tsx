import DashboardLayout from "@/components/layouts/DashboardLayout";
import useEditProfile from "./useEditProfile";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/react";

const EditProfile = () => {
  const {
    control,
    handleSubmit,
    handleEditProfile,
    isLoadingProfile,
    isPendingEditProfile,
    isDirty,
    handleCancel,
  } = useEditProfile();

  if (isLoadingProfile) {
    return (
      <DashboardLayout>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col justify-center gap-6 bg-gray-50 p-6 lg:flex-row">
        <div className="mb-6 w-full max-w-3xl self-start rounded-2xl border border-gray-200 bg-white px-6 py-8 lg:w-1/2">
          <div className="flex flex-col items-center justify-between gap-4">
            <div className="relative h-28 w-28 rounded-full bg-black object-cover">
              <div className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-[#5568FE] p-2">
                <i className="fa-solid fa-camera text-white"></i>
              </div>
            </div>
            <div className="cursor-pointer rounded-xl border border-[#5568FE] px-8 py-3 font-medium text-[#5568FE] hover:bg-[#5568FE] hover:text-white">
              <h3>Change Foto</h3>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleEditProfile)}
            className="flex flex-col gap-8 px-8 py-12"
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                    Full Name
                  </h4>
                  <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                    <input
                      {...field}
                      className="w-full text-[18px] focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}
            />

            <Controller
              name="universitas"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                    Universitas
                  </h4>
                  <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                    <input
                      {...field}
                      className="w-full text-[18px] focus:outline-none"
                      placeholder="Enter your university"
                    />
                  </div>
                </div>
              )}
            />

            <Controller
              name="jurusan"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                    Jurusan
                  </h4>
                  <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                    <input
                      {...field}
                      className="w-full text-[18px] focus:outline-none"
                      placeholder="Enter your major"
                    />
                  </div>
                </div>
              )}
            />

            <div className="flex flex-col gap-2">
              <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                Linked In
              </h4>
              <div className="rounded-2xl border border-[#E6E3DF] bg-gray-100 px-5 py-4">
                <input
                  className="w-full bg-transparent text-[18px] focus:outline-none"
                  placeholder="https://linkedin.com/in/DafaFajarBagaskara"
                  disabled
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isDirty || isPendingEditProfile}
              className="mt-8 flex cursor-pointer items-center justify-center rounded-2xl bg-[#5568FE] p-5 text-[20px] font-bold text-white hover:bg-[#5568FE]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isPendingEditProfile ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Simpan Perubahan"
              )}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="-mt-6 cursor-pointer p-5 text-center text-[20px] font-bold text-[#7A7A7A] hover:text-black"
            >
              Batalkan
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;
