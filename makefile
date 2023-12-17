.PHONY: all frontend backend dev
dev:
	make -j 2 frontend backend
frontend:
	cd frontend/open-source-erp && yarn watch
frontend-build:
	cd frontend/open-source-erp && yarn build
backend:
	cd backend && air