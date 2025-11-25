# Combined LaTeX Report - Instructions

## ✅ Files Created

1. **combine-latex.py** - Python script to merge all chapters
2. **combine.bat** - Windows batch file to run the script
3. **main-complete.tex** - Output file (will be generated)

## 🚀 How to Create the Combined File

### Option 1: Run the Batch File (Easiest for Windows)

```bash
# Simply double-click: combine.bat
# Or run from command prompt:
cd "d:\Sem 7\MW\NEW\music-project\website\report"
combine.bat
```

### Option 2: Run Python Script Directly

```bash
cd "d:\Sem 7\MW\NEW\music-project\website\report"
python combine-latex.py
```

### Option 3: Manual Combination (if scripts don't work)

The Python script essentially does this:
1. Takes the preamble (document class, packages, settings)
2. Adds all front matter files (title, certificate, declaration, acknowledgements, abstract)
3. Adds table of contents commands
4. Adds all 11 chapter files in order
5. Adds bibliography commands
6. Saves as `main-complete.tex`

## 📄 What You Get

After running the script, you'll have:

**main-complete.tex** - A single ~3000+ line LaTeX file containing:
- Complete preamble
- Title page
- Certificate
- Declaration
- Acknowledgements
- Abstract
- All 11 chapters (inline, not \include)
- Bibliography setup

## 🔨 Compiling the Combined File

Once `main-complete.tex` is created:

```bash
pdflatex main-complete.tex
bibtex main-complete  
pdflatex main-complete.tex
pdflatex main-complete.tex
```

Output: **main-complete.pdf** (85-90 pages)

## 📝 Notes

- The combined file is LARGE (~3000+ lines, ~150KB)
- Easier to share as one file
- Still needs `references.bib` in the same directory
- Images still need to be in `images/` folder (or comment out)

## ⚠️ If Scripts Don't Work

I've also provided the script content. You can:
1. Open `combine-latex.py` in any text editor
2. The logic is clear - it just reads each chapter file and combines them
3. Or I can manually create the combined file for you

## 🎯 Why Combined Version?

Benefits:
- ✅ Single file - easier to share
- ✅ No \include statements - simpler
- ✅ Works on Overleaf or any LaTeX editor
- ✅ Self-contained (except bibliography)

Drawbacks:
- ❌ Very large file
- ❌ Harder to edit individual chapters
- ❌ Slower compilation

Use the modular version (main.tex with chapter files) for development.
Use the combined version (main-complete.tex) for sharing/submission.
