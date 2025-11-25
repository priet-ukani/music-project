# Combined LaTeX File - Usage Instructions

## What is main-combined.tex?

`main-combined.tex` is a **single-file version** of the Musical Map of India report that contains all chapters inline. This file was created by combining:

- Preamble and document setup from `main.tex`
- All front matter files (title page, certificate, declaration, acknowledgements, abstract)
- All 11 chapters (01-introduction through 11-conclusion)
- Back matter (references)
    
## Why use the combined file?

**Advantages:**
- ✅ Single file is easier to share and distribute
- ✅ No need to manage multiple chapter files
- ✅ Simpler compilation process
- ✅ Good for final submission or archiving

**Disadvantages:**
- ❌ Harder to edit (very large file with 2,905 lines)
- ❌ Can't work on individual chapters separately
- ❌ Version control diffs will be large

## How to compile

### Method 1: Using pdflatex (Recommended)

```bash
cd "d:\Sem 7\MW\NEW\music-project\website\report"

# First compilation
pdflatex main-combined.tex

# Process bibliography
bibtex main-combined

# Second compilation (resolves references)
pdflatex main-combined.tex

# Third compilation (finalizes cross-references)
pdflatex main-combined.tex
```

### Method 2: Using latexmk (Automated)

```bash
latexmk -pdf main-combined.tex
```

This automatically runs all necessary compilations.

### Method 3: Using Overleaf

1. Upload `main-combined.tex` to Overleaf
2. Upload `references.bib`
3. Upload the `images/` folder
4. Set main document to `main-combined.tex`
5. Click "Recompile"

## Files you need

To compile successfully, ensure you have:

1. **main-combined.tex** - The combined document
2. **references.bib** - Bibliography file
3. **images/** folder - All images referenced in the document

## Regenerating the combined file

If you make changes to individual chapter files and want to regenerate the combined file:

```bash
cd "d:\Sem 7\MW\NEW\music-project\website\report"
./combine-simple.sh
```

Or on Windows:
```bash
bash combine-simple.sh
```

## File structure comparison

### Original structure (separate files):
```
report/
├── main.tex (uses \include for chapters)
├── chapters/
│   ├── 00-titlepage.tex
│   ├── 00-certificate.tex
│   ├── ...
│   ├── 01-introduction.tex
│   ├── 02-history-evolution.tex
│   └── ... (through 11-conclusion.tex)
└── references.bib
```

### Combined structure:
```
report/
├── main-combined.tex (everything inline)
└── references.bib
```

## Editing workflow

### For major editing:
Use the **separate chapter files** (`main.tex` + `chapters/*.tex`) for easier editing and version control.

### For final version:
Use **main-combined.tex** for submission, sharing, or archiving.

## Troubleshooting

### "File not found" errors
- Ensure `references.bib` is in the same directory
- Check that image paths in `\includegraphics{}` are correct
- Make sure you have all required LaTeX packages installed

### Bibliography not showing
Run the compilation sequence:
1. `pdflatex main-combined.tex`
2. `bibtex main-combined`
3. `pdflatex main-combined.tex` (twice)

### Missing packages
Install missing packages using your LaTeX distribution's package manager:
- **TeX Live**: `tlmgr install <package-name>`
- **MiKTeX**: Packages auto-install on first use

## Output

Successfully compiling produces:
- **main-combined.pdf** - The final report document
- **main-combined.aux** - Auxiliary file
- **main-combined.log** - Compilation log
- **main-combined.bbl** - Processed bibliography
- **main-combined.blg** - Bibliography log

## File statistics

- **Lines**: 2,905
- **Size**: ~168 KB
- **Chapters**: 11 main chapters + front/back matter
- **Estimated pages**: 50-70 pages (depending on images)

## Questions?

For issues or questions:
1. Check the compilation log file (`main-combined.log`)
2. Verify all required files are present
3. Ensure LaTeX packages are up to date

---

Generated on: November 26, 2025
Script: combine-simple.sh
