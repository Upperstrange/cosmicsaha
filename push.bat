@echo off
echo Running Flutter release pipeline...

git add .
if %errorlevel% neq 0 exit /b %errorlevel%

git commit -m "_"
if %errorlevel% neq 0 exit /b %errorlevel%

git push origin main
if %errorlevel% neq 0 exit /b %errorlevel%

echo Done!
pause
