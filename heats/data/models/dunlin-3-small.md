---
name: "Dunlin 3 Small"
line: "The one for a laptop: 4B, 128K context, no graphics card."
params: "4B"
active: "4B"
context: "128K"
layers: 32
q4: "2.6 GB"
bf16: "8.1 GB"
runs_on: "A laptop with no graphics card"
memory:
  - "4-bit, 4 GB"
  - "8-bit, 6 GB"
  - "BF16, 11 GB"
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
ollama: "dunlin3:4b"
hf: "dunlin-project/dunlin-3-small-instruct"
gguf: "dunlin-project/dunlin-3-small-instruct-GGUF:Q4_K_M"
base_hf: "https://huggingface.co/dunlin-project/dunlin-3-small-base"
files:
  - label: "Q4_K_M · 2.6 GB · most people"
    href: "https://huggingface.co/dunlin-project/dunlin-3-small-instruct-GGUF"
  - label: "Q8_0 · 4.4 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-small-instruct-GGUF"
  - label: "BF16 · 8.1 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-small-instruct"
hardware: "/media/machine-laptop.jpg"
featured: false
released: 2027-03-04
---
## Intended use

A laptop’s everyday model: summaries, drafts, questions about a document you give it, small scripts, calls to two or three tools. It runs without a graphics card at reading speed.

## Out of scope

Programs longer than one file, math proofs, and questions about the world it can’t look up in what you gave it.

## Training

Small was trained from scratch, on the same data and tokenizer as the 14B. Pretraining ran on 9.4 trillion tokens, 92% of them downloadable from [the data manifest](https://github.com/dunlin-project/data-manifest); the rest is listed by source and may not be redistributed. A checkpoint was kept every 50 billion tokens, and each can be downloaded. Knowledge stops in June 2026.

The instruct weights were tuned on 2.3 million conversations and 140,000 tool calls, all published.

## Evaluation

Our runs, February 26, 2027, greedy decoding, the mean of three seeds.

| Heat | Dunlin 3 Small | Dunlin 2 Small |
|---|---:|---:|
| Knowledge | 49.7 | 41.2 |
| Math | 61.5 | 46.9 |
| Code | 66.8 | 54.1 |
| Following instructions | 78.3 | 69.0 |

## Limitations and risks

Past 64K tokens it finds what is written in a text but loses what is implied. In Swahili and Hindi its spelling is good and its register often too formal.

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
