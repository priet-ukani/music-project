#!/usr/bin/env python3
"""
Combine all LaTeX chapter files into a single main-complete.tex file
"""

import os

# Define the report directory
REPORT_DIR = r"d:\Sem 7\MW\NEW\music-project\website\report"
CHAPTERS_DIR = os.path.join(REPORT_DIR, "chapters")
OUTPUT_FILE = os.path.join(REPORT_DIR, "main-complete.tex")

# Chapter files in order
CHAPTER_FILES = [
    "01-introduction.tex",
    "02-history-evolution.tex",
    "03-why-matters.tex",
    "04-music-unique.tex",
    "05-regional-systems.tex",
    "06-platform-experience.tex",
    "07-research-methods.tex",
    "08-challenges.tex",
    "09-learned.tex",
    "10-future.tex",
    "11-conclusion.tex"
]

# Preamble and front matter
PREAMBLE = r"""% Musical Map of India - Final Year Project Report
% Complete Single-File Version - All chapters combined inline

\documentclass[12pt,a4paper,openright]{book}

% Essential Packages
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{geometry}
\usepackage{graphicx}
\usepackage{caption}
\usepackage{subcaption}
\usepackage{hyperref}
\usepackage{cite}
\usepackage{amsmath}
\usepackage{amssymb}
\usepackage{setspace}
\usepackage{fancyhdr}
\usepackage{titlesec}
\usepackage{tocloft}
\usepackage{enumitem}
\usepackage{booktabs}
\usepackage{longtable}
\usepackage{array}
\usepackage{multirow}
\usepackage{xcolor}
\usepackage{tikz}
\usepackage{csquotes}

% Page Layout
\geometry{
    top=1in,
    bottom=1in,
    left=1.5in,
    right=1in
}

% Line spacing
\onehalfspacing

% Header and Footer Setup
\pagestyle{fancy}
\fancyhf{}
\fancyhead[LE,RO]{\thepage}
\fancyhead[RE]{\leftmark}
\fancyhead[LO]{\rightmark}
\renewcommand{\headrulewidth}{0.4pt}

% Chapter and Section Formatting
\titleformat{\chapter}[display]
{\normalfont\huge\bfseries}{\chaptertitlename\ \thechapter}{20pt}{\Huge}
\titlespacing*{\chapter}{0pt}{0pt}{40pt}

% Hyperref Setup
\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    filecolor=magenta,
    urlcolor=cyan,
    citecolor=green,
    pdftitle={Musical Map of India - Final Year Project Report},
    pdfauthor={Priet Ukani},
    pdfsubject={Digital Musicology and Cultural Heritage},
    pdfkeywords={Indian Music, Cultural Heritage, Digital Preservation}
}

% Custom Commands
\newcommand{\region}[1]{\textit{#1}}
\newcommand{\instrument}[1]{\texttt{#1}}
\newcommand{\raga}[1]{\textit{#1}}

% Graphics Path
\graphicspath{{images/}}

% Begin Document
\begin{document}

% =====================================
% FRONT MATTER
% =====================================
\frontmatter

"""

BACKMATTER = r"""
% =====================================
% BACK MATTER
% =====================================
\backmatter

% References
\bibliographystyle{ieeetr}
\bibliography{references}
\addcontentsline{toc}{chapter}{References}

\end{document}
"""

def read_file(filepath):
    """Read a file and return its contents"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        # Remove any leading/trailing whitespace but preserve internal formatting
        return content.strip() + "\n\n"
    except FileNotFoundError:
        print(f"Warning: File not found: {filepath}")
        return f"% FILE NOT FOUND: {filepath}\n\n"
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return f"% ERROR READING FILE: {filepath}\n\n"

def combine_files():
    """Combine all LaTeX files into one"""
    print("Combining LaTeX files...")
    
    # Start with preamble
    combined = PREAMBLE
    
    # Add front matter files
    print("Adding front matter...")
    frontmatter_files = [
        "00-titlepage.tex",
        "00-certificate.tex",
        "00-declaration.tex",
        "00-acknowledgements.tex",
        "00-abstract.tex"
    ]
    
    for filename in frontmatter_files:
        filepath = os.path.join(CHAPTERS_DIR, filename)
        print(f"  - {filename}")
        combined += f"% ===== {filename} =====\n"
        combined += read_file(filepath)
    
    # Add TOC, LOF, LOT
    combined += r"""% Table of Contents
\tableofcontents
\addcontentsline{toc}{chapter}{Table of Contents}

% List of Figures
\listoffigures
\addcontentsline{toc}{chapter}{List of Figures}

% List of Tables
\listoftables
\addcontentsline{toc}{chapter}{List of Tables}

% =====================================
% MAIN MATTER - CHAPTERS
% =====================================
\mainmatter

"""
    
    # Add all chapters
    print("\nAdding chapters...")
    for filename in CHAPTER_FILES:
        filepath = os.path.join(CHAPTERS_DIR, filename)
        print(f"  - {filename}")
        combined += f"% ===== {filename} =====\n"
        combined += read_file(filepath)
    
    # Add back matter
    combined += BACKMATTER
    
    # Write combined file
    print(f"\nWriting combined file to: {OUTPUT_FILE}")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(combined)
    
    print("✓ Complete! File created successfully.")
    print(f"\nOutput: {OUTPUT_FILE}")
    print(f"Size: {len(combined):,} characters")
    print("\nYou can now compile with:")
    print("  pdflatex main-complete.tex")
    print("  bibtex main-complete")
    print("  pdflatex main-complete.tex")
    print("  pdflatex main-complete.tex")

if __name__ == "__main__":
    combine_files()
