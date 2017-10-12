## Development Workflow

### Small Feature Development

Contributors who have write access to the repository will practice continuous
delivery (CD as known from now on in this document).

We will define CD in this document as a method of developing a feature per
commit with an encapsulating test that proves that the functionality is working,
the contributor will test their code locally and if all is passing will push to
*master*.

For contributors that do not have write access, follow the same conventions but
open a Pull Request instead.

### Large changesets

When larger changes need to be made, or the work that is carried out spans
multiple components / services of the application at the same time a single
commit will not suffice.

In this scenario, the contributor should open a pull request instead.

## Commit messages

Follow [Git blessed](http://chris.beams.io/posts/git-commit/) and [Conventional
Commits](https://conventionalcommits.org)

1. Separate subject from body with a blank line
1. Limit the subject line to 50 characters
1. Capitalize the subject line
1. Do not end the subject line with a period
1. Use the imperative mood in the subject line
1. Wrap the body at 72 characters
1. Use the body to explain what and why vs. how

Types:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test
