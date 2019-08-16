workflow "Fetch the dependencies" {
  on = "push"
  resolves = ["Install Deno"]
}

action "Install Deno" {
  uses = "axetroy/deno-action"
  args = "help"
}
