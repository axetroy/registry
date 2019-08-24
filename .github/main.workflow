workflow "Test on Linux" {
  resolves = ["Run test"]
  on = "push"
}

action "Run test" {
  uses = "axetroy/deno-action@0.16.0"
  args = "run test.ts"
}