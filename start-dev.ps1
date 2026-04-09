$host.ui.RawUI.WindowTitle = "Launcher"

# Iniciar Backend (Spring Boot) en una nueva ventana
Start-Process powershell -ArgumentList "mvn spring-boot:run" -WorkingDirectory "$PSScriptRoot"

# Esperar un poco para que el backend empiece a levantar (opcional)
Start-Sleep -Seconds 5

# Iniciar Frontend (Angular) en una nueva ventana
Start-Process powershell -ArgumentList "npm start" -WorkingDirectory "$PSScriptRoot\frontend"

Write-Host "Iniciando servidores..."
Write-Host "Backend: http://localhost:8081"
Write-Host "Frontend: http://localhost:4200"
Write-Host "Puedes cerrar esta ventana, los servidores corren por separado."
