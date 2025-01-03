#!/bin/bash

echo "🔄 Restarting Life in Character servers..."

# Kill existing processes
echo "⏹️  Stopping existing processes..."
pkill -f "node"
sleep 2

# Verify ports are free
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "⚠️  Port $1 is still in use. Forcing closure..."
        lsof -ti:$1 | xargs kill -9
    fi
}

check_port 3001
check_port 5173

# Start backend server
echo "🚀 Starting backend server..."
cd server
npm start &
sleep 3

# Start frontend server
echo "🚀 Starting frontend server..."
cd ..
npm run dev &

echo "✅ Restart process completed!"
echo "📝 Frontend should be running on http://localhost:5173"
echo "📝 Backend should be running on http://localhost:3001"
echo "⚡ Use 'ps aux | grep node' to check running processes"
