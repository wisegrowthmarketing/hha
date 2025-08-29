#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Household Harmony Agencies Development Environment...${NC}"
echo -e "${YELLOW}This will start both Vite dev server and Netlify functions${NC}\n"

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${RED}🛑 Shutting down development servers...${NC}"
    kill $VITE_PID $NETLIFY_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start Vite dev server in background
echo -e "${GREEN}📱 Starting Vite dev server...${NC}"
npm run dev &
VITE_PID=$!

# Wait a moment for Vite to start
sleep 3

# Start Netlify dev server in background
echo -e "${GREEN}☁️  Starting Netlify functions...${NC}"
npm run dev:netlify &
NETLIFY_PID=$!

echo -e "\n${GREEN}✅ Both servers are starting up!${NC}"
echo -e "${BLUE}📱 Vite dev server: http://localhost:5173 (or next available port)${NC}"
echo -e "${BLUE}☁️  Netlify functions: http://localhost:8888${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# Wait for both processes
wait 