import { createContext, useState, useCallback, ReactNode } from "react";

type ToasterType = "success" | "error" | "info" | "warning";

interface ToasterContextType {
  setToaster: (data: { type: ToasterType; message: string }) => void;
}

export const ToasterContext = createContext<ToasterContextType>({
  setToaster: () => {},
});

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    type: ToasterType;
    message: string;
  } | null>(null);

  const setToaster = useCallback(
    (data: { type: ToasterType; message: string }) => {
      setToast(data);
      setTimeout(() => setToast(null), 3000); // hide after 3s
    },
    [],
  );

  return (
    <ToasterContext.Provider value={{ setToaster }}>
      {children}
      {toast && (
        <div
          className={`fixed right-4 bottom-4 z-50 rounded-lg px-4 py-2 text-white shadow-lg ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
                ? "bg-red-500"
                : toast.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </ToasterContext.Provider>
  );
};
