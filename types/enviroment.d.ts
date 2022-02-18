namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_HOSTNAME: string;
    DATABASE_NAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_PORT: string;
    DATABASE_URL: string;
    DATABASE_USER: string;

    EMAIL_FROM: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_SERVER_PORT: string;
    EMAIL_SERVER_USER: string;

    HASURA_GRAPHQL_ADMIN_SECRET: string;
    HASURA_GRAPHQL_API_HOST: string;

    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_API_URL_WS: string;

    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
