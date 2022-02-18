# next-with-hasura-auth

https://auth.tremendous.dev

## Quickstart

1. Deploy a new Hasura instance (e.g. [Docker](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)/[Railway](https://railway.app/new/template?HASURA_GRAPHQL_ADMIN_SECRETDesc=To%20secure%20your%20GraphQL%20endpoint%20and%20the%20Hasura%20console.&plugins=postgresql&template=https%3A%2F%2Fgithub.com%2Frailwayapp%2Fexamples%2Ftree%2Fmaster%2Fexamples%2Fhasura&envs=HASURA_GRAPHQL_ADMIN_SECRET))
2. [Generate a secret](https://generate-secret.vercel.app/32) (e.g. `21a44cd781c6567e2f5b6b950558df85`)
3. Add the following environment variables to Hasura:

```
HASURA_GRAPHQL_ADMIN_SECRET=password
HASURA_GRAPHQL_JWT_SECRET`={"type":"HS256" "key":"21a44cd781c6567e2f5b6b950558df85"}
```

4. Copy `.env.example` to `.env` file
5. Update `DATABASE_` and `EMAIL_` variables to match your Hasura deployment and SendGrid API keys. Ensure `NEXTAUTH_SECRET` equals the same value from #2 (e.g. `NEXTAUTH_SECRET=21a44cd781c6567e2f5b6b950558df85`. Update `HASURA_GRAPHQL_API_HOST` and `HASURA_GRAPHQL_ADMIN_SECRET` with values from your Hasura deployment.
