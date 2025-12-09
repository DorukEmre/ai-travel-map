SHELL	= /bin/sh

NAME	= ai-travel-map


build:
	mkdir -p frontend/dist
	docker compose -f docker-compose.yml up --build

stop:
	docker compose -f docker-compose.yml stop

down:
	docker compose -f docker-compose.yml down


.PHONY: build stop down

.DEFAULT_GOAL := build
