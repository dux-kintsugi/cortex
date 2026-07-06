#!/bin/bash
# Double-click me to serve Cortex to your iPhone over Wi-Fi.
# Leave this window open while playing; Ctrl+C (or close it) to stop.
cd "$(dirname "$0")"

PORT=8642
if lsof -i :$PORT >/dev/null 2>&1; then PORT=8643; fi

IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)

echo "════════════════════════════════════════════════════"
echo "  🧠 Cortex is being served to your local network"
echo ""
if [ -n "$IP" ]; then
  echo "  On your iPhone (same Wi-Fi), open Safari and visit:"
  echo ""
  echo "      http://$IP:$PORT"
  echo ""
  echo "  Then: Share button → Add to Home Screen"
else
  echo "  ⚠ Couldn't detect your Wi-Fi IP. Find it in"
  echo "  System Settings → Wi-Fi → Details, then open"
  echo "  http://<that-ip>:$PORT on your iPhone."
fi
echo ""
echo "  (If macOS asks whether Python may accept incoming"
echo "   network connections, click Allow.)"
echo "════════════════════════════════════════════════════"
echo ""

python3 -m http.server $PORT --bind 0.0.0.0
