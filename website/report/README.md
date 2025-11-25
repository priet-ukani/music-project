# LaTeX Report Compilation Guide

## Musical Map of India - Final Year Project Report

### Files Structure

```
report/
├── main.tex                    # Main document
├── references.bib              # Bibliography (70+ references)
├── chapters/
│   ├── 00-titlepage.tex       # IIIT Hyderabad title page
│   ├── 00-certificate.tex     # Supervisor certificate
│   ├── 00-declaration.tex     # Student declaration
│   ├── 00-acknowledgements.tex # Acknowledgements
│   ├── 00-abstract.tex        # Project abstract
│   ├── 01-introduction.tex    # Chapter 1 (4 pages)
│   ├── 02-history-evolution.tex # Chapter 2 (8 pages)
│   ├── 03-why-matters.tex     # Chapter 3 (6 pages)
│   ├── 04-music-unique.tex    # Chapter 4 (12 pages)
│   ├── 05-regional-systems.tex # Chapter 5 (24 pages)
│   ├── 06-platform-experience.tex # Chapter 6 (8 pages)
│   ├── 07-research-methods.tex # Chapter 7 (5 pages)
│   ├── 08-challenges.tex      # Chapter 8 (6 pages)
│   ├── 09-learned.tex         # Chapter 9 (4 pages)
│   ├── 10-future.tex          # Chapter 10 (5 pages)
│   └── 11-conclusion.tex      # Chapter 11 (3 pages)
└── images/                     # Image placeholders (to be added)
```

### Total Pages: ~85-90 pages

## Compilation Instructions

### Prerequisites

1. **LaTeX Distribution:**
   - Windows: MiKTeX or TeX Live
   - Mac: MacTeX
   - Linux: TeX Live

2. **Required Packages** (should auto-install with MiKTeX):
   - inputenc, fontenc, geometry
   - graphicx, caption, subcaption
   - hyperref, cite
   - amsmath, amssymb
   - setspace, fancyhdr, titlesec
   - tocloft, enumitem
   - booktabs, longtable, array, multirow
   - xcolor, tikz, csquotes

### Compilation Steps

#### Method 1: Command Line

```bash
cd "d:\Sem 7\MW\NEW\music-project\website\report"

# First pass - process content
pdflatex main.tex

# Process bibliography
bibtex main

# Second pass - resolve citations
pdflatex main.tex

# Third pass - resolve all references
pdflatex main.tex
```

#### Method 2: LaTeX Editor (Recommended)

**Using TeXstudio/TeXmaker:**
1. Open `main.tex`
2. Set build profile to: PDFLaTeX + BibTeX + PDFLaTeX + PDFLaTeX
3. Press F5 or click "Build & View"

**Using Overleaf (Online):**
1. Create new project
2. Upload all files maintaining directory structure
3. Set main document to `main.tex`
4. Click "Recompile"

### Before Compiling

#### 1. Update Personal Information

Edit `chapters/00-titlepage.tex`:
```latex
\textbf{Priet Ukani}\\
Roll No: [Your Roll Number]\\  % <- Add your roll number
```

```latex
\textbf{[Supervisor Name]}\\  % <- Add supervisor name
\textit{[Designation]}\\       % <- Add designation
```

#### 2. Update Declaration and Certificate

Edit `chapters/00-declaration.tex` and `chapters/00-certificate.tex`:
- Add supervisor name
- Add roll number
- Update date and place

#### 3. Add Images (Optional but Recommended)

Create `images/` directory and add:
- `iiit-logo.png` - University logo
- `india-map-musical-regions.png` - India map with regions
- `ancient-musical-notation.png` - Historical notation
- `mughal-music-miniature.png` - Mughal miniature
- `rhythm-comparison-diagram.png` - Tala comparison
- `carnatic-tala-example.png` - Carnatic tala
- `instruments-map-india.png` - Instrument distribution map
- `platform-interface-screenshot.png` - Platform UI
- `soundscape-mixer-interface.png` - Mixer interface

**Note:** Report will compile without images (shows placeholders).

### Common Issues and Solutions

**Issue 1: Missing Packages**
```
Error: File 'xxx.sty' not found
```
Solution: Install package through MiKTeX Package Manager or TeX Live

**Issue 2: Bibliography Not Showing**
Solution: Ensure you run: pdflatex → bibtex → pdflatex → pdflatex

**Issue 3: Broken References**
```
Warning: Reference `xxx' undefined
```
Solution: Run pdflatex one more time

**Issue 4: Image Not Found**
```
Error: File 'xxx.png' not found
```
Solution: Either add the image or comment out the \includegraphics command temporarily

### Output

Successfully compiled document will be: `main.pdf` (~85-90 pages)

### Customization

#### Margins and Spacing
Edit in `main.tex`:
```latex
\geometry{
    top=1in,      % Adjust as needed
    bottom=1in,
    left=1.5in,   % Binding margin
    right=1in
}
```

#### Line Spacing
Change in `main.tex`:
```latex
\onehalfspacing  % or \doublespacing
```

#### Citation Style
Change in `main.tex`:
```latex
\bibliographystyle{ieeetr}  % or plain, apalike, etc.
```

### Quality Checklist

Before final submission:
- [ ] All personal details updated (name, roll no, supervisor)
- [ ] All images added (or placeholders removed)
- [ ] Bibliography compiles correctly
- [ ] Table of contents shows all chapters
- [ ] List of figures populated
- [ ] No compilation errors
- [ ] Page numbers correct
- [ ] Headers/footers formatted properly
- [ ] Proofread for typos
- [ ] Print test (if submitting hard copy)

### Support

For LaTeX help:
- [Overleaf Documentation](https://www.overleaf.com/learn)
- [LaTeX Wikibook](https://en.wikibooks.org/wiki/LaTeX)
- [TeX StackExchange](https://tex.stackexchange.com/)

---

**Total Word Count:** ~30,000-35,000 words
**Total Pages:** 85-90 pages
**Total References:** 70+ academic citations
**Completion:** 100%
