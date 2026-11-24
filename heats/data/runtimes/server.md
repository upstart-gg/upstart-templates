---
label: "A server"
command: "docker run --gpus all -p 8000:8000 ghcr.io/dunlin-project/server:3.1 --size 14b"
comment: "# 28 GB at BF16 · one 48 GB card, or two 24 GB"
notes: "An API other programs can call, with batching, on port 8000. Mount a folder at /weights to keep the files between restarts."
home: false
---
