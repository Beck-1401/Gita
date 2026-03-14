@echo off
REM Kurukṣetra Deploy Script
REM Syncs source from Google Drive to local build dir, builds, then deploys to Firebase

set GDRIVE_SRC=G:\My Drive\Mitra\Gita\gita-website\Kuruksetra
set LOCAL_BUILD=C:\Users\BradB\kuruksetra-local

echo [1/4] Syncing source files to local build directory...
xcopy /E /Y /I "%GDRIVE_SRC%\src" "%LOCAL_BUILD%\src\" > nul
xcopy /Y "%GDRIVE_SRC%\index.html" "%LOCAL_BUILD%\" > nul
xcopy /Y "%GDRIVE_SRC%\vite.config.js" "%LOCAL_BUILD%\" > nul
xcopy /Y "%GDRIVE_SRC%\tailwind.config.js" "%LOCAL_BUILD%\" > nul
xcopy /Y "%GDRIVE_SRC%\postcss.config.js" "%LOCAL_BUILD%\" > nul
xcopy /Y "%GDRIVE_SRC%\package.json" "%LOCAL_BUILD%\" > nul
echo Done.

echo [2/4] Installing dependencies (if needed)...
cd /d "%LOCAL_BUILD%"
call npm install --prefer-offline

echo [3/4] Building...
call npm run build

echo [4/4] Deploying to Firebase...
REM Copy built files to Firebase public dir
REM Option A: If kuruksetra has its own firebase.json:
REM   call firebase deploy --only hosting
REM
REM Option B: Copy dist/ into the main gita-website public dir under /kuruksetra/
REM   xcopy /E /Y /I dist\* "G:\My Drive\Mitra\Gita\gita-website\public\kuruksetra\"
REM   then deploy from gita-website
REM
REM For now, copy dist to a subfolder and remind user to deploy:
if not exist "%GDRIVE_SRC%\dist" mkdir "%GDRIVE_SRC%\dist"
xcopy /E /Y /I "%LOCAL_BUILD%\dist\*" "%GDRIVE_SRC%\dist\" > nul

echo.
echo Build complete! dist/ folder updated in Google Drive.
echo To deploy: firebase deploy from the appropriate Firebase project.
pause
