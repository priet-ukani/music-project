@echo off
REM Combine all LaTeX chapter files into one main-complete.tex
REM Run this from the report directory

echo Combining LaTeX files...
echo.

cd /d "%~dp0"

REM Create output file with preamble
echo Creating combined file...

python combine-latex.py

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Combined file created: main-complete.tex
    echo.
    echo To compile, run:
    echo   pdflatex main-complete.tex
    echo   bibtex main-complete
    echo   pdflatex main-complete.tex  
    echo   pdflatex main-complete.tex
) else (
    echo.
    echo ERROR: Python script failed
    echo Please ensure Python is installed and try again
)

pause
