#!/bin/zsh
# Installs the "Read in Presto" right-click service (Quick Action).
# After this, select text in any app → right-click → Services → Read in Presto.
cd "$(dirname "$0")"
mkdir -p ~/Library/Services
rm -rf ~/Library/Services/"Read in Presto.workflow" ~/Library/Services/"Read in Fovea.workflow"
cp -R "Read in Presto.workflow" ~/Library/Services/
/System/Library/CoreServices/pbs -update 2>/dev/null
echo "Installed. Select text anywhere, right-click → Services → Read in Presto."
echo "(If it doesn't appear yet, log out and back in once.)"
