workflow "Test" {
  on = "push"
  resolves = ["Run test"]
}

action "Run test" {
  uses = "axetroy/deno-action@0.0.1"
  args = "run test.ts"
}
