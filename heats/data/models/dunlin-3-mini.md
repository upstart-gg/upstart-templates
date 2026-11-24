---
name: "Dunlin 3 Mini"
line: "The one for your pocket: 1.6B, 32K context, a phone or a Raspberry Pi 5."
params: "1.6B"
active: "1.6B"
context: "32K"
layers: 24
q4: "1.1 GB"
bf16: "3.2 GB"
runs_on: "A phone or a Raspberry Pi 5"
memory:
  - "4-bit, 2 GB"
  - "8-bit, 3 GB"
  - "BF16, 5 GB"
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
ollama: "dunlin3:1.6b"
hf: "dunlin-project/dunlin-3-mini-instruct"
gguf: "dunlin-project/dunlin-3-mini-instruct-GGUF:Q4_K_M"
base_hf: "https://huggingface.co/dunlin-project/dunlin-3-mini-base"
files:
  - label: "Q4_K_M · 1.1 GB · most people"
    href: "https://huggingface.co/dunlin-project/dunlin-3-mini-instruct-GGUF"
  - label: "Q8_0 · 1.8 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-mini-instruct-GGUF"
  - label: "BF16 · 3.2 GB"
    href: "https://huggingface.co/dunlin-project/dunlin-3-mini-instruct"
hardware: "/media/machine-phone.jpg"
featured: false
released: 2027-03-04
---
## Intended use

Short tasks on the device itself: rewriting a sentence, sorting messages, filling in a form from a paragraph, tagging photos by their captions. It answers in nine languages and needs no connection.

## Out of scope

Long reasoning, arithmetic past two steps and facts you can’t check. With 1.6B parameters, it knows little and says it with confidence.

## Training

Mini was distilled from Dunlin 3 14B, on the same tokenizer. Pretraining ran on 9.4 trillion tokens, 92% of them downloadable from [the data manifest](https://github.com/dunlin-project/data-manifest); the rest is listed by source and may not be redistributed. A checkpoint was kept every 50 billion tokens, and each can be downloaded. Knowledge stops in June 2026.

The instruct weights were tuned on 1.1 million short conversations, all published.

## Evaluation

Our runs, February 26, 2027, greedy decoding, the mean of three seeds.

| Heat | Dunlin 3 Mini | Dunlin 2 Mini |
|---|---:|---:|
| Knowledge | 38.6 | 29.8 |
| Math | 44.1 | 27.5 |
| Code | 52.3 | 38.0 |
| Following instructions | 71.9 | 60.4 |

## Limitations and risks

It repeats itself past 2,000 words, mixes up dates and names, and drops rare languages into English. Safety tuning is thinner than on the larger sizes: put a filter in front of anything the public can type into.

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
