@echo off
setlocal
cd /d C:\Users\BradB\gita-website

echo.
echo =============================================
echo   Deploying Gita Website to Google Cloud
echo =============================================
echo.

:: Load GEMINI_API_KEY from .env.local
for /f "usebackq tokens=1,* delims==" %%a in (".env.local") do (
    if "%%a"=="GEMINI_API_KEY" set GEMINI_API_KEY=%%b
)

if "%GEMINI_API_KEY%"=="" (
    echo ERROR: GEMINI_API_KEY not found in .env.local
    pause
    exit /b 1
)

gcloud run deploy gita-website ^
  --source . ^
  --project gita-488115 ^
  --region us-central1 ^
  --allow-unauthenticated ^
  --port 8080 ^
  --memory 512Mi ^
  --cpu 1 ^
  --set-env-vars "GEMINI_API_KEY=%GEMINI_API_KEY%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =============================================
    echo   SUCCESS! Site is live at:
    echo   https://www.bradbannon.com
    echo =============================================
) else (
    echo.
    echo Deployment failed. Check the errors above.
)

pause
