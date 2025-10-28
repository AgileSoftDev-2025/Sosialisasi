import DashboardLayout from "@/components/layouts/DashboardLayout";
import useCreatePage from "./useCreatePage";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const CreatePage = () => {
  const {
    control,
    errors,
    preview,
    isPending,
    handleSubmitForm,
    handleCreatePost,
  } = useCreatePage();

  const CATEGORIES = ["All", "Competition", "Project"] as const;

  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmitForm(handleCreatePost)}
        className="mt-10 flex w-[80%] flex-col"
      >
        <article className="rounded-3xl bg-white p-8 shadow-sm">
          {/* Header User (Statis) */}
          <div className="flex flex-row items-center gap-5 p-3">
            <div className="h-[56px] w-[56px] rounded-xl bg-black"></div>
            <div>
              <h3 className="text-[20px] font-medium text-[#202020]">
                Mochamad Javier Elsyera
              </h3>
              <h4 className="text-[16px] text-[#787878]">
                Information System Student
              </h4>
            </div>
          </div>

          {/* Kategori */}
          <Controller
            name="type_content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="mt-6 flex flex-col gap-4 p-3">
                <h2 className="text-[20px] font-medium text-[#202020]">
                  Choose Category
                </h2>
                <div className="flex flex-row items-center gap-4">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => onChange(cat)}
                      className={cn(
                        "flex cursor-pointer flex-row items-center gap-2 rounded-full px-6 py-3",
                        value === cat
                          ? "bg-[#5568FE] text-white"
                          : "bg-[#E5E7EB] text-[#787878]",
                      )}
                    >
                      <p className="text-[16px] font-medium">{cat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />

          {/* Deskripsi */}
          <div className="mt-6 flex flex-col gap-4 p-3">
            <h2 className="text-[20px] font-medium text-[#202020]">
              Post Description
            </h2>
            <Controller
              name="text_content"
              control={control}
              render={({ field }) => (
                <div className="rounded-2xl border border-[#ADAEBC] p-7">
                  <textarea
                    {...field}
                    placeholder="Write something to share…"
                    className="h-48 w-full resize-none text-[20px] focus:outline-none"
                  />
                </div>
              )}
            />
            {errors.text_content && (
              <p className="text-sm text-red-500">
                {errors.text_content.message}
              </p>
            )}
          </div>

          {/* Upload gambar */}
          <div className="mt-6 flex flex-col gap-4 p-3">
            <h2 className="text-[20px] font-medium text-[#202020]">
              Add Pictures
            </h2>
            <Controller
              name="file"
              control={control}
              render={({ field: { onChange } }) => (
                <label
                  htmlFor="fileUpload"
                  className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-[#ADAEBC] py-14 hover:bg-gray-50"
                >
                  <i className="fa-solid fa-camera text-[48px] text-[#787878]"></i>
                  <p className="text-[22px] font-medium text-[#787878]">
                    Add Picture(s)
                  </p>
                  <p className="text-[16px] text-[#787878]">Click to browse</p>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onChange(e.target.files)}
                  />
                </label>
              )}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-60 rounded-lg border object-cover"
              />
            )}
          </div>

          {/* Tombol Post */}
          <div className="flex justify-end p-3">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-auto min-w-[120px] flex-row items-center justify-center gap-3 rounded-lg bg-[#5568FE] p-3 text-white hover:bg-[#5568FE]/80 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isPending ? (
                "Posting..."
              ) : (
                <>
                  <i className="fas fa-paper-plane text-[24px]"></i>
                  <h2 className="text-[20px] font-bold">Post</h2>
                </>
              )}
            </button>
          </div>
        </article>
      </form>
    </DashboardLayout>
  );
};

export default CreatePage;
