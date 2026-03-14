@echo off
REM Kurukṣetra Dev Script
REM Syncs source from Google Drive and starts the Vite dev server

set GDRIVE_SRC=G:\My Drive\Mitra\Gita\gita-website\Kuruksetra
set LOCAL_BUILD=C:\Users\BradB\kuruksetra-local

echo Syncing source files...
xcopy /E /Y /I "%GDRIVE_SRC%\src" "%LOCAL_BUILD%\src\" > nul
xcopy /Y "%GDRIVE_SRC%\index.html" "%LOCAL_BUILD%\" > nul
xcopy /Y "%GDRIVE_SRC%\vite.config.js" "%LOCAL_BUILD%\" > nul
xcopy /Y "%GDRIVE_SRC%\tailwind.config.js" "%LOCAL_BUILD%\" > nul
xcopy /Y "%GDRIVE_SRC%\postcss.config.js" "%LOCAL_BUILD%\" > nul

echo Starting dev server at http://localhost:5175/kuruksetra/
echo (Vite will watch C:\Users\BradB\kuruksetra-local\src for changes)
echo Note: Edit files in Google Drive, then re-run this script or manually copy to local.

cd /d "%LOCAL_BUILD%"
call npm run dev -- --port 5175
