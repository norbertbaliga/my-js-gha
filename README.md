# My JavaScript GitHub Action

[![GitHub Super-Linter](https://github.com/norbertbaliga/my-js-gha/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/norbertbaliga/my-js-gha/actions/workflows/ci.yml/badge.svg)

## Purpose

Created this repository to host my JavaScript action. The repository was cloned
from [JavaScript Action template](https://github.com/actions/javascript-action/)
and customized based on my learnings.

## Usage

Tag(s) can be uses to reference different stable versions of my action.

To include the action in a workflow in another repository, you can use the
`uses` syntax with the `@` symbol to reference a specific branch, tag, or commit
hash.

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Run my Action
    id: run-action
    uses: norbertbaliga/my-js-gha@v1 # Commit with the `v1` tag
    with:
      milliseconds: 3000

  - name: Print Output
    id: output
    run: echo "${{ steps.run-action.outputs.time }}"
```
