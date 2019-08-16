workflow "Fetch the dependencies" {
  on = "push"
  resolves = ["Install Deno"]
}

action "Install Deno" {
  uses = "axetroy/deno-action@0.0.1"
  args = "help"
}
