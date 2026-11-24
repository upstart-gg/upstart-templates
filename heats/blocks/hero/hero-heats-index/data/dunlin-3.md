---
name: "Dunlin 3"
line: "The one most people start with: 14B, 128K context, one 12 GB card."
params: "14B"
active: "14B"
context: "128K"
layers: 40
q4: "8.9 GB"
bf16: "28 GB"
runs_on: "One 12 GB graphics card"
memory:
  - "4-bit, 11 GB"
  - "8-bit, 18 GB"
  - "BF16, 32 GB"
tokens: "9.4T tokens, 92% of them downloadable"
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
ollama: "dunlin3:14b"
hf: "dunlin-project/dunlin-3-instruct"
gguf: "dunlin-project/dunlin-3-instruct-GGUF:Q4_K_M"
base_hf: "https://huggingface.co/dunlin-project/dunlin-3-base"
files:
  - label: "Q4_K_M · 8.9 GB · most people"
    href: "https://huggingface.co/dunlin-project/dunlin-3-instruct-GGUF"
  - label: "Q8_0 · 15 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-instruct-GGUF"
  - label: "BF16 · 28 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-instruct"
hardware: "/media/machine-card.webp"
featured: true
released: 2027-03-04
---
## Intended use

The one most people start with. Long documents, writing in nine languages, code across a few files, agents that call tools and return JSON. The instruct weights are what the commands run; the base weights are for fine-tuning and research.

## Out of scope

Medical, legal or financial decisions with nobody checking. Facts after June 2026, which it does not know. Anything where a confident wrong answer does harm.

## Training

Forty layers, grouped-query attention, a tokenizer of 96,000 entries shared by the whole family. Pretraining ran on 9.4 trillion tokens, 92% of them downloadable from [the data manifest](https://github.com/dunlin-project/data-manifest); the rest is listed by source and may not be redistributed. A checkpoint was kept every 50 billion tokens, and each can be downloaded. Knowledge stops in June 2026.

The instruct weights were tuned on 2.3 million conversations, then with preferences from 4,100 volunteers. The reward model is not published yet: it comes in 3.2.

## Evaluation

Our runs, February 26, 2027, greedy decoding, the mean of three seeds. The nine heats, with their configs, are on [the evals page](/evals).

| Heat | Dunlin 3 14B | Dunlin 2 14B | Baseline A | Baseline B |
|---|---:|---:|---:|---:|
| Knowledge | 61.8 | 54.2 | 58.9 | 57.1 |
| Math | 78.4 | 63.1 | 74.6 | 71.2 |
| Code | 81.7 | 69.5 | 77.3 | 79.2 |
| Long documents | 88.2 | 71.4 | 79.6 | 84.1 |

## Limitations and risks

It makes up citations when asked for sources, so give it the documents. It follows instructions hidden in a page it reads more often than we like: 7 times in 100 on our own test, down from 19 in Dunlin 2. Jokes do not survive translation.

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
