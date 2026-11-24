---
name: "Dunlin 3 Coder"
line: "The one for your editor: 14B, 128K context, forty programming languages."
params: "14B"
active: "14B"
context: "128K"
layers: 40
q4: "8.9 GB"
bf16: "28 GB"
runs_on: "In your editor, on one 12 GB card"
memory:
  - "4-bit, 11 GB"
  - "8-bit, 18 GB"
  - "BF16, 32 GB"
tokens: "9.4T, then 0.6T of code"
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
ollama: "dunlin3:coder"
hf: "dunlin-project/dunlin-3-coder-instruct"
gguf: "dunlin-project/dunlin-3-coder-instruct-GGUF:Q4_K_M"
base_hf: "https://huggingface.co/dunlin-project/dunlin-3-coder-base"
files:
  - label: "Q4_K_M · 8.9 GB · most people"
    href: "https://huggingface.co/dunlin-project/dunlin-3-coder-instruct-GGUF"
  - label: "Q8_0 · 15 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-coder-instruct-GGUF"
  - label: "BF16 · 28 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-coder-instruct"
hardware: "/media/machine-desk.jpg"
featured: false
released: 2027-03-04
---
## Intended use

Code in your editor: completion in the middle of a line, edits across files, tests written from a function, explanations in the words of your own code base. Forty languages, from C to Zig.

## Out of scope

Conversation and prose, where Dunlin 3 14B is better. Generated code that nobody reads before it runs.

## Training

Coder continues Dunlin 3 14B for another 600 billion tokens of permissively licensed code, its licenses checked file by file. Pretraining ran on 9.4 trillion tokens, 92% of them downloadable from [the data manifest](https://github.com/dunlin-project/data-manifest); the rest is listed by source and may not be redistributed. A checkpoint was kept every 50 billion tokens, and each can be downloaded. Knowledge stops in June 2026.

The instruct weights were tuned on 420,000 real edits, with their tests, given by projects that agreed to it.

## Evaluation

Our runs, February 26, 2027, greedy decoding, the mean of three seeds.

| Heat | Dunlin 3 Coder | Dunlin 3 14B |
|---|---:|---:|
| Code | 89.6 | 81.7 |
| Fill in the middle | 84.0 | 70.2 |
| Edits that pass their tests | 58.7 | 41.9 |
| Tool calls | 76.1 | 74.9 |

## Limitations and risks

It imports packages that do not exist about once in 60 answers: check each name before you install it. It writes older idioms in languages that changed after June 2026.

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
