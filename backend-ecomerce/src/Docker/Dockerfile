FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=mi_base_de_datos

COPY init.sql /docker-entrypoint-initdb.d/

# Exponemos el puerto 5432 (puerto por defecto de PostgreSQL)
EXPOSE 5432
