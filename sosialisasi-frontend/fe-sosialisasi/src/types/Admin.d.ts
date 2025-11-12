interface IAdminUserStatusCount {
  activeUsers: number;
  inactiveUsers: number;
  mahasiswaUsers: number;
  dosenUsers: number;
  totalUsers: number;
}

interface IAdminContentCount {
  allUserContents: number;
  competitionUserContents: number;
  projectUserCount: number;
  totalContent: number;
}

interface IApiResponse<T> {
  message: string;
  data: T;
}

export { IAdminUserStatusCount, IAdminContentCount, IApiResponse };
