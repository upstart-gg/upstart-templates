---
name: "Dunlin 3 Flock"
line: "The one for a team: 62B in all, 7B at work, 256K context, a 48 GB workstation."
params: "62B"
active: "7B"
context: "256K"
layers: 48
q4: "37 GB"
bf16: "124 GB"
runs_on: "A 48 GB workstation"
memory:
  - "4-bit, 42 GB"
  - "8-bit, 74 GB"
  - "BF16, 138 GB"
tokens: "9.4T"
cutoff: "June 2026"
languages:
  - "English"
  - "Spanish"
  - "Portuguese"
  - "French"
  - "German"
  - "Hindi"
  - "Swahili"
  - "Korean"
  - "Traditional Chinese"
ollama: "dunlin3:flock"
hf: "dunlin-project/dunlin-3-flock-instruct"
gguf: "dunlin-project/dunlin-3-flock-instruct-GGUF:Q4_K_M"
base_hf: "https://huggingface.co/dunlin-project/dunlin-3-flock-base"
files:
  - label: "Q4_K_M · 37 GB · most people"
    href: "https://huggingface.co/dunlin-project/dunlin-3-flock-instruct-GGUF"
  - label: "Q8_0 · 66 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-flock-instruct-GGUF"
  - label: "BF16 · 124 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-flock-instruct"
hardware: "/media/machine-tower.jpg"
featured: false
released: 2027-03-04
---
## Intended use

A workstation or a small server shared by a team: whole code bases, 256K tokens of contracts or transcripts at once, long chains of tool calls. Sixty-four experts, of which about 7B parameters work on each token, so it answers at the speed of a small model.

## Out of scope

Anything on less than 48 GB of memory: it runs from disk, at one word a second.

## Training

Flock is a mixture of 64 experts, 62B parameters in all and 7B active, trained from scratch on the same data. Pretraining ran on 9.4 trillion tokens, 92% of them downloadable from [the data manifest](https://github.com/dunlin-project/data-manifest); the rest is listed by source and may not be redistributed. A checkpoint was kept every 50 billion tokens, and each can be downloaded. Knowledge stops in June 2026.

The instruct weights were tuned on the same conversations as the 14B, with 310,000 tool calls.

## Evaluation

Our runs, February 26, 2027, greedy decoding, the mean of three seeds. There was no Flock in Dunlin 2: it is compared with the 14B.

| Heat | Dunlin 3 Flock | Dunlin 3 14B |
|---|---:|---:|
| Knowledge | 70.4 | 61.8 |
| Math | 86.2 | 78.4 |
| Code | 88.9 | 81.7 |
| Long documents | 92.5 | 88.2 |

## Limitations and risks

Experts specialize in ways we only half understand: some answer in Portuguese when the question is in Spanish. At 4-bit, two benchmarks lose more than a point against full precision; the report says which.

## Citation

Cite the family’s technical report:

```
@techreport{dunlin3,
  title  = {Dunlin 3 Technical Report},
  author = {The Dunlin maintainers and contributors},
  year   = {2027},
  month  = {March}
}
```
