dev:
	make -j 2 frontend backend

frontend:
	cd frontend/open-source-erp && yarn watch

frontend-build:
	cd frontend/open-source-erp && yarn build

backend:
	cd backend && air

sqlc:
	sqlc generate

postgres:
	docker run --name postgres -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:16-alpine

createdb:
	docker exec -it postgres createdb --username=root --owner=root erp_go

dropdb:
	docker exec -it postgres dropdb erp_go

migrateup:
	migrate -path backend/db/migration -database postgres://root:secret@localhost:5432/erp_go?sslmode=disable -verbose up

migrateup1:
	migrate -path db/migration -database "$(DB_URL)" -verbose up 1

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down

migratedown1:
	migrate -path db/migration -database "$(DB_URL)" -verbose down 1

new_migration:
	migrate create -ext sql -dir backend/db/migration -seq $(name)

axios:
	npx openapi-generator-cli generate -i ./backend/api/openapi/api-v1.yaml -g typescript-axios -o ./frontend/open-source-erp/src/axios

api-spec:
	oapi-codegen -package api -generate types,gin,spec backend/api/openapi/api-v1.yaml > backend/api/api.gen.go

prepare:
	make env

gen-tools:
	make oapi-codegen; make install-openapigen-npm;

env:
	cp backend/.env.example backend/.env.development.local && cp backend/.env.example backend/.env.test.local

oapi-codegen:
	go install github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen@latest

install-openapigen-npm:
	npm install @openapitools/openapi-generator-cli -g

run-dev:
	docker-compose up --build

.PHONY: all frontend backend dev sqlc postgres createdb dropdb migrateup migrateup1 axios api-spec install-openapigen-npm rn-dev env oapi-codegen prepare gen-tools