# Ramcharitmanas word-study sidecars

This directory holds optional English study annotations. The files do not alter the pinned
Devanagari source corpus one directory above.

## Layout

`manifest.v1.json` is the only discovery point used by the application. It lists ordered,
independently reviewable shards. A kāṇḍa may therefore have many small batches, for example:

```text
word-study/
  manifest.v1.json
  bala-kanda/0001-0050.v1.json
  bala-kanda/0051-0100.v1.json
```

The manifest and shard contracts are documented by `manifest.schema.v1.json` and
`shard.schema.v1.json`. Generated or not-yet-independently-reviewed work must use
`editorial-under-review`; it must not be described as human-reviewed.

## Token and line contract

Every annotated entry supplies a close English rendering plus compact source-order line groups.
Repeated tokens remain repeated. `line` is the one-based index among the entry's non-empty source
lines after standalone metre headings (`चौपाई`, `दोहा/सोरठा`, `छंद`, and `श्लोक`) are omitted. The
normal storage form is a two-value tuple: `["source token", "contextual English gloss"]`.

When a token needs richer analysis, its tuple may be replaced with an object containing `original`
and `meaning`, plus optional `language` (`awa` or `sa`), `lemma`, `grammar`, bounded `confidence`,
contextual `alternatives`, `sourceRef`, and `reviewStatus`. These fields are evidence and editorial
aids; only the exact source token and contextual English gloss are required inside each line group.

At load and release-check time, the application applies the same deterministic tokenizer used by the
scaffolder: verse numerals are removed, then each Unicode letter/mark run is retained in source order.
The annotation token array must match that source-token array exactly in NFC, including boundaries
and repetitions. A skipped, duplicated, reordered, invented, split, or merged token fails validation.
Romanization is derived by the application from each source token so the sidecars cannot drift from
the reader's transliteration method.

Each manifest shard also records `sourceTextSha256`, calculated over the exact source strings for its
entries in shard order, joined with `\n␞\n`. This binds an editorial batch to the source text it
translated even when the annotation JSON itself is later revised.

The manifest may truthfully declare partial coverage while batches are in progress. If `complete` is
`true`, all 1,113 reader entries must be annotated exactly once.
