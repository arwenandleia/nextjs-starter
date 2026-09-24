# Simple git workflow

## Workflow

1. **Update Local Main** : This ensures you have the latest code before starting

```bash
git switch main
git pull origin main
git status
```

2. **Create Feature Branch** : Isolate work from production

```bash
git switch -c feature/tic-tac-toe
```

3. **Save and Commit** : Save and create commits on feature branch. use `git add .` with caution. It might make more sense to use something like **lazygit** and individually select files you want to add.

```bash
git status
git add .
git commit -m "feat: adding game board"
```

4. **Push Feature to Remote** : Upload the feature branch to remote server like github. We use the `-u` flag so that next time we want to push to remote we can just use `git push`

```bash
git push -u origin feature/tic-tac-toe
```

5. **Open a Pull Request** : Hopefully should trigger relevant CI-CD pipelines before merging into main. Review the pull request and merge into main if everything looks good.

6. **Clean Up Local** : switch back to main on local development and remove the feature branch.

```bash
git switch main
git pull origin main
git branch -d feature/tic-tac-toe
```

## Appendix

### Adding minor changes to the previous latest commit

Lets say you commit something and later figure out that only a small typo or minor styling change needs to be done. you dont have to create a whole new commit for it. you can just stage the relevant change and then commit it to the previous commit.
**NOTE** : This will create a new commit hash so **DO NOT** use it if that commit has been used elsewhere in any form

```bash
git commit --amend --no-edit
```
