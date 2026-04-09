@echo off
echo Iniciando servidores...

:: Iniciar Backend (Spring Boot) en una nueva ventana
start "Backend SpringBoot" cmd /k "mvn spring-boot:run"

:: Esperar 5 segundos
timeout /t 5

:: Iniciar Frontend (Angular) en una nueva ventana
cd frontend
start "Frontend Angular" cmd /k "npm start"
cd ..

echo ----------------------------------------------
echo Servidores iniciados en ventanas separadas.
echo Backend: http://localhost:8081
echo Frontend: http://localhost:4200
echo ----------------------------------------------
