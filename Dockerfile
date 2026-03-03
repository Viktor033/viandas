# ETAPA 1: Construir el Frontend (Angular)
FROM public.ecr.aws/docker/library/node:20 AS build-frontend
WORKDIR /app/frontend

# Copiar dependencias del nivel de frontend
COPY frontend/package*.json ./

# Instalar TODO (incluyendo devDependencies como Angular CLI)
RUN npm install

# Copiar el código fuente y construir
COPY frontend/ ./
RUN npm run build


# ETAPA 2: Construir el Backend (Java Spring Boot)
FROM public.ecr.aws/docker/library/maven:3.9.5-eclipse-temurin-17 AS build-backend
WORKDIR /app

# Copiar pom.xml y fuente de Java
COPY pom.xml .
COPY src ./src

# Para que el copy-resources funcione en el target local de maven sin usar npm dentro de Java:
# Creamos la carpeta de salida que espera maven-resources-plugin
RUN mkdir -p target/frontend-staging

# Copiamos los archivos estáticos de Angular ya pre-compilados en la Etapa 1
COPY --from=build-frontend /app/target/frontend-staging target/frontend-staging/

# IMPORTANTE: Construir el .jar PERO saltándose la descarga e instalación de node interna de Maven
RUN mvn clean package -DskipTests -Dskip.installnodenpm=true -Dskip.npm=true


# ETAPA 3: Imagen Final Liviana para Producción
FROM public.ecr.aws/docker/library/eclipse-temurin:17-jre
WORKDIR /app

# Copiar solo el .jar empaquetado final
COPY --from=build-backend /app/target/viandas-*.jar viandas.jar

# Exponer el puerto
EXPOSE 8080

# Comando para correr la aplicación
ENTRYPOINT ["java", "-jar", "viandas.jar"]
