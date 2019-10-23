## Dev Env

# start dev server
cd server

npm install

npm run dev

# start dev client
cd client

yarn install

yarn start

## Typescript type generate

apollo client:download-schema --endpoint=http://localhost:8080/graphql ./src/schema.json

apollo client:codegen ./src/__generated__/types.ts --outputFlat --includes=./src/**/queries.ts --addTypename --localSchemaFile=./src/schema.json --target=typescript
