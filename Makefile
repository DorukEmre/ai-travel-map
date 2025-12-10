SHELL	= /bin/sh

NAME	= ai-travel-map

# Parse .env file and fail if not found
-include .env

ifeq ($(wildcard .env),)
$(error .env file is required)
endif


clean_frontend:
	rm -rf frontend/dist
	mkdir -p frontend/dist

build_frontend: clean_frontend
	cd frontend && npm ci && \
	VITE_GEMINI_API_KEY="$(GEMINI_API_KEY)" npm run build

dev: clean_frontend
	docker compose -f docker-compose.dev.yml up --build

prod: build_frontend
	docker compose -f docker-compose.prod.yml up --build


stop_dev:
	docker compose -f docker-compose.dev.yml stop

stop_prod:
	docker compose -f docker-compose.prod.yml stop


.PHONY: prod dev clean_frontend build_frontend stop_dev stop_prod

.DEFAULT_GOAL := _no_default

_no_default:
	@echo "No default target. Please run 'make <target>'." >&2
	@exit 1
