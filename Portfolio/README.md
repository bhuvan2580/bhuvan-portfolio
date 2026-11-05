# Bhuvan S. | Portfolio Website

A responsive personal portfolio built with **React (Vite)** and **Python Flask**. The content is based on the supplied resume.

## Project structure

```text
bhuvan-portfolio/
├── backend/
│   ├── app.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        └── styles.css
```

## 1. Run the Flask backend

Open a terminal in `backend`:

```bash
python -m venv venv
```

Activate it:

**Windows PowerShell**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows CMD**
```bat
venv\Scripts\activate
```

Install dependencies and start Flask:

```bash
pip install -r requirements.txt
python app.py
```

The API runs at `http://127.0.0.1:5000`.

## 2. Run the React frontend

Open a second terminal in `frontend`:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Contact form

The contact form posts to Flask at `/api/contact`. Messages are saved in `backend/messages.db` (SQLite). This is a simple starter implementation. Before deploying publicly, add spam protection and configure secure production hosting.

## Personalise before publishing

- Replace the LinkedIn and GitHub URLs if they change.
- Add a profile photo in `frontend/public/` if you want one, then update the hero section.
- Add project demo URLs when available.
- Do not publish private contact details unless you are comfortable receiving public enquiries.

## Production notes

Build the frontend with `npm run build`. Deploy the Flask API separately (or serve the built frontend through a production web server), then set the frontend API base URL using a Vite environment variable if your deployment uses a different backend URL.
