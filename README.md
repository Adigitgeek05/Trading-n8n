No-Code Workflow Automation Platform (N8N-Style)

A no-code execution and workflow automation platform, built from scratch, inspired by tools like n8n, Zapier, and IFTTT.
Users can create automation workflows visually through a drag-and-drop node graph editor powered by React Flow.
The backend stores workflows in MongoDB as graph structures (nodes + edges) and executes them using a custom workflow engine.

🚀 Features
🎨 Visual Workflow Builder

Drag-and-drop interface built using React Flow (@xyflow/react)

Create nodes such as:

Triggers (Timer, Price Trigger, Webhook)

Actions (API Call, Database Operation, Custom Script)

Connect nodes with edges to define execution flow

Real-time validation for broken/missing connections

⚙️ Backend Workflow Engine

Executes workflows step-by-step based on graph structure

Supports:

Cron-based timers

Event-based triggers

API/Webhook triggers

Node execution isolation and error handling

Execution logs stored in MongoDB

🗄️ MongoDB Workflow Storage

Flexible storage of workflows using JSON-like structures

Stores:

Workflow metadata

Node definitions

Edge connections

Trigger definitions

Execution histories

🔌 Integrations & APIs

REST API for:

Creating workflows

Updating nodes

Executing workflows

Getting execution results

Optional WebSocket support for live updates

🛠️ Tech Stack
Frontend

React

React Flow (@xyflow/react)

TypeScript

TailwindCSS / ShadcnUI (optional)

Vite or Next.js

Backend

Node.js

Express.js

TypeScript

MongoDB

Mongoose

node-cron (for scheduled triggers)

Redis + BullMQ (optional for job queues)
