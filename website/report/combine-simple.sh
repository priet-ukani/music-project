#!/bin/bash
# Simple script to combine all LaTeX files

echo "% Musical Map of India - Final Year Project Report" > main-combined.tex
echo "% Complete Single-File Version - All chapters combined inline" >> main-combined.tex
echo "" >> main-combined.tex
echo "\documentclass[12pt,a4paper,openright]{book}" >> main-combined.tex
echo "" >> main-combined.tex

# Add preamble from main.tex (lines up to \begin{document})
sed -n '1,/^\\begin{document}/p' main.tex >> main-combined.tex

echo "" >> main-combined.tex
echo "% =====================================" >> main-combined.tex
echo "% COMBINED CONTENT FROM ALL CHAPTERS" >> main-combined.tex
echo "% =====================================" >> main-combined.tex
echo "" >> main-combined.tex

# Add each chapter file
for file in chapters/00-*.tex chapters/01-*.tex chapters/02-*.tex chapters/03-*.tex chapters/04-*.tex chapters/05-*.tex chapters/06-*.tex chapters/07-*.tex chapters/08-*.tex chapters/09-*.tex chapters/10-*.tex chapters/11-*.tex; do
    if [ -f "$file" ]; then
        echo "Adding $file..."
        echo "" >> main-combined.tex
        echo "% ===== $(basename $file) =====" >> main-combined.tex
        echo "" >> main-combined.tex
        cat "$file" >> main-combined.tex
        echo "" >> main-combined.tex
    fi
done

# Add back matter
echo "" >> main-combined.tex
echo "% =====================================" >> main-combined.tex
echo "% BACK MATTER" >> main-combined.tex
echo "% =====================================" >> main-combined.tex
echo "\backmatter" >> main-combined.tex
echo "" >> main-combined.tex
echo "% References" >> main-combined.tex
echo "\bibliographystyle{ieeetr}" >> main-combined.tex
echo "\bibliography{references}" >> main-combined.tex
echo "\addcontentsline{toc}{chapter}{References}" >> main-combined.tex
echo "" >> main-combined.tex
echo "\end{document}" >> main-combined.tex

echo "✓ Combined file created: main-combined.tex"
wc -l main-combined.tex
