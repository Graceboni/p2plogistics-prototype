# Git Cheat Sheet

## Initialize a New Repository

### Empty Repository
```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin [repository-url]
git push -u origin main
```

### Repository with Existing Files
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin [repository-url]
git push -u origin main
```

## Clone/Fetch an Existing Repository

### Clone a Repository
```bash
git clone [repository-url]
```

### Clone into a Specific Directory
```bash
git clone [repository-url] [directory-name]
```

### Fetch Latest Changes
```bash
git fetch origin
```

### Fetch and Merge (Pull)
```bash
git pull origin [branch-name]
```

## General Git Operations

### Check Status
```bash
git status
```

### View Changes
```bash
git diff
git diff --staged
```

### Add Files
```bash
git add [file-name]          # Add specific file
git add .                     # Add all files in current directory
git add -A                    # Add all files (including deletions)
```

### Commit Changes
```bash
git commit -m "commit message"
git commit -am "message"      # Add and commit tracked files in one step
```

### View Commit History
```bash
git log
git log --oneline             # Compact view
git log --graph --oneline     # Visual graph
```

### Push Changes
```bash
git push                      # Push to current branch
git push origin [branch-name] # Push specific branch
git push -u origin [branch-name] # Push and set upstream
```

### Pull Changes
```bash
git pull                      # Pull from current branch
git pull origin [branch-name] # Pull from specific branch
```

## Branch Operations

### Create a New Branch
```bash
git branch [branch-name]
```

### Create and Switch to Branch
```bash
git checkout -b [branch-name]
# or
git switch -c [branch-name]
```

### Switch Between Branches
```bash
git checkout [branch-name]
# or
git switch [branch-name]
```

### List Branches
```bash
git branch                   # Local branches
git branch -a                # All branches (local and remote)
git branch -r                # Remote branches only
```

### Delete Branch
```bash
git branch -d [branch-name]  # Delete local branch
git branch -D [branch-name]  # Force delete local branch
git push origin --delete [branch-name] # Delete remote branch
```

### Rename Branch
```bash
git branch -m [old-name] [new-name]
```

## Merge Operations

### Merge a Branch into Current Branch
```bash
git checkout [target-branch]  # Switch to target branch
git pull                      # Update target branch
git merge [source-branch]     # Merge source into target
```

### Merge with No Fast-Forward (Preserves Branch History)
```bash
git merge --no-ff [branch-name]
```

### Merge with Squash (Combines Commits)
```bash
git merge --squash [branch-name]
```

### Resolve Merge Conflicts
```bash
# After merge conflict:
git status                    # See conflicted files
# Edit files to resolve conflicts
git add .                     # Stage resolved files
git commit -m "Resolved merge conflicts"
```

### Abort a Merge
```bash
git merge --abort
```

## Remote Operations

### View Remote Repositories
```bash
git remote -v
```

### Add Remote Repository
```bash
git remote add origin [repository-url]
```

### Change Remote URL
```bash
git remote set-url origin [new-repository-url]
```

### Remove Remote
```bash
git remote remove origin
```

### Update Remote Tracking Branches
```bash
git fetch origin
git fetch --all              # Fetch from all remotes
```

## Undo Operations

### Undo Unstaged Changes
```bash
git restore [file-name]      # Restore specific file
git restore .                # Restore all files
```

### Unstage Files
```bash
git restore --staged [file-name]
git reset HEAD [file-name]
```

### Amend Last Commit
```bash
git commit --amend -m "new message"
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

## Common Workflows

### Feature Branch Workflow
```bash
# Create and work on feature branch
git checkout -b feat/[feature-name]
git add .
git commit -m "Add feature"
git push -u origin feat/[feature-name]

# Merge feature into develop
git checkout develop
git pull origin develop
git merge --no-ff feat/[feature-name]
git push origin develop
```

### Update Local Branch Before Merging
```bash
git checkout [branch-name]
git pull origin [branch-name]
```

## Useful Tips

- Always pull before pushing to avoid conflicts
- Use descriptive commit messages
- Create branches for new features
- Keep main/master branch stable
- Review changes with `git diff` before committing
