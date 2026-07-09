#!/bin/zsh
# Installs the "Read in Fovea" right-click service (Quick Action).
# After this, select text in any app → right-click → Services → Read in Fovea.
cd "$(dirname "$0")"
mkdir -p ~/Library/Services
rm -rf ~/Library/Services/"Read in Fovea.workflow"
cp -R "Read in Fovea.workflow" ~/Library/Services/
/System/Library/CoreServices/pbs -update 2>/dev/null
echo "Installed. Select text anywhere, right-click → Services → Read in Fovea."
echo "(If it doesn't appear yet, log out and back in once.)"
