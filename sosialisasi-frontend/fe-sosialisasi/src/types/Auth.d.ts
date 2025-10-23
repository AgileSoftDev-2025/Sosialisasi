interface IRegister {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IActivation {
  code: string;
}

interface ILogin {
  email: string;
  password: string;
}

export type { IRegister, ILogin, IActivation };
