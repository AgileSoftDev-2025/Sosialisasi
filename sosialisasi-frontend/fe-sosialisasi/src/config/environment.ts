const environment = {
  API_URL: process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL,
  AUTH_SECRET: process.env.NEXTAUTH_SECRET,
  CONSTANT_URL: process.env.NEXT_PUBLIC_CONSTANT_URL,
};

export default environment;
