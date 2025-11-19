interface IAdminUserStatusCount {
  activeUsers: number;
  inactiveUsers: number;
  mahasiswaUsers: number;
  dosenUsers: number;
  totalUsers: number;
}

interface IUserAdmin {
  _id: string;
  fullName: string;
  email: string;
  profilePicture: string;
  jurusan: string;
  universitas: string;
  status: "Mahasiswa" | "Dosen";
  role: "user" | "admin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IAdminContentCount {
  allUserContents: number;
  competitionUserContents: number;
  projectUserCount: number;
  totalContent: number;
}

interface IUserFilters {
  status?: "All" | "Mahasiswa" | "Dosen";
  isActive?: "All" | "true" | "false";
}
interface IApiResponse<T> {
  message: string;
  data: T;
}

export {
  IAdminUserStatusCount,
  IAdminContentCount,
  IUserFilters,
  IApiResponse,
  IUserAdmin,
};
