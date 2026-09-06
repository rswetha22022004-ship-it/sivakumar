# P. Sivakumar — Portfolio Website

A full-stack, production-ready personal portfolio.

- **Frontend:** React + Vite + Tailwind CSS + React Router + Axios + Lucide React
- **Backend:** Django + Django REST Framework + Simple JWT
- **Database:** MySQL (falls back to SQLite automatically if MySQL isn't configured, so you can try it instantly)

All content (profile, experience, skills, projects, education, resume, social
links) is stored in the database and editable from **Django Admin** — nothing
is hardcoded in the React app.

---

## 1. MySQL Database Creation

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'change-this-password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

> If you skip this step, the backend automatically uses a local SQLite file
> (`db.sqlite3`) instead — handy for a quick first run.

---

## 2. Backend Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

> `mysqlclient` needs MySQL's dev headers on your system:
> - Ubuntu/Debian: `sudo apt-get install default-libmysqlclient-dev build-essential pkg-config`
> - macOS: `brew install mysql-client pkg-config`
> - Windows: use the prebuilt wheel that pip fetches automatically.

### .env configuration

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
SECRET_KEY=change-this-to-a-long-random-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASSWORD=change-this-password
DB_HOST=127.0.0.1
DB_PORT=3306

FRONTEND_URL=http://localhost:5173
```

Leave `DB_NAME` blank to use SQLite instead of MySQL.

### Migrations & superuser

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_portfolio     # optional: preloads the profile/skills/projects
```

### Run the backend

```bash
python manage.py runserver
```

- API base: `http://127.0.0.1:8000/api/`
- Admin panel: `http://127.0.0.1:8000/admin/`

---

## 3. Frontend Installation

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env` if your API runs somewhere other than the default:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### Run the frontend

```bash
npm run dev
```

Visit `http://localhost:5173`.

### Build for production

```bash
npm run build      # outputs to frontend/dist
npm run preview    # preview the production build locally
```

---

## 4. requirements.txt (backend)

```
Django==5.0.6
djangorestframework==3.15.1
django-cors-headers==4.3.1
djangorestframework-simplejwt==5.3.1
mysqlclient==2.2.4
python-decouple==3.8
Pillow==10.3.0
```

## 5. package.json highlights (frontend)

Key dependencies: `react`, `react-dom`, `react-router-dom`, `axios`,
`lucide-react`, `tailwindcss`, `vite`. See `frontend/package.json` for exact
versions.

---

## 6. API Endpoint Documentation

Base URL: `/api/`

| Method | Endpoint                     | Description                              | Auth        |
|--------|-------------------------------|-------------------------------------------|-------------|
| GET    | `/profile/`                  | Hero/about profile data + social links     | Public      |
| GET    | `/social-links/`             | List social links                          | Public      |
| POST   | `/social-links/`             | Create a social link                       | JWT required|
| GET    | `/experience/`               | List work experience                       | Public      |
| POST/PUT/DELETE | `/experience/<id>/`  | Manage an experience entry                 | JWT required|
| GET    | `/skills/`                   | Skill categories with nested skills        | Public      |
| GET    | `/projects/`                 | List all projects (summary)                | Public      |
| GET    | `/projects/<slug>/`          | Full project detail                        | Public      |
| POST/PUT/DELETE | `/projects/<slug>/`  | Manage a project                           | JWT required|
| GET    | `/education/`                | List education records                     | Public      |
| GET    | `/resume/`                   | Active resume file URL                     | Public      |
| POST   | `/contact/`                  | Submit the contact form                    | Public      |
| POST   | `/auth/login/`               | Obtain JWT access + refresh token          | Public      |
| POST   | `/auth/refresh/`             | Refresh an access token                    | Public      |

Write operations (`POST`/`PUT`/`DELETE`) on portfolio content require a JWT
`Authorization: Bearer <token>` header — obtained via `/api/auth/login/` with
a Django admin/staff user's credentials. Read-only `GET` requests are public
so the site renders without authentication. Content is normally managed
through **Django Admin** rather than these write endpoints.

---

## 7. Editing Content

Everything below is editable from Django Admin (`/admin/`):

- **Profile** — name, titles, tagline, about text, company, location, contact info
- **Social Links** — LinkedIn, GitHub, etc.
- **Experience** — company, designation ("Software Developer" placeholder until confirmed), responsibilities
- **Skill Categories & Skills** — mark MERN-core skills as "primary stack" to highlight them
- **Projects & Project Technologies** — add real technology badges, images, features, live/GitHub links
- **Education** — degree, institution, year, description
- **Resume** — upload a PDF; mark it active
- **Contact Messages** — view messages submitted from the site

---

## 8. Deployment Notes

**Backend (Django):**
1. Set `DEBUG=False` and a real `SECRET_KEY`/`ALLOWED_HOSTS` in `.env`.
2. Point `DB_*` env vars at your production MySQL instance.
3. `python manage.py collectstatic`
4. Serve with Gunicorn/uWSGI behind Nginx, e.g.:
   ```bash
   pip install gunicorn
   gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:8000
   ```
5. Serve `media/` (resume, project images) via Nginx or a storage service (S3, etc.) in production — the local `MEDIA_ROOT` setup is fine for small deployments.
6. Never commit `.env` or `SECRET_KEY` — they're already git-ignored.

**Frontend (React):**
1. Set `VITE_API_BASE_URL` to your deployed API's URL before building.
2. `npm run build` → deploy the `dist/` folder to Vercel, Netlify, Nginx, or any static host.
3. Update `FRONTEND_URL` in the backend `.env` so CORS allows your deployed frontend origin.

---

## 9. Folder Structure

```
portfolio/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── portfolio_backend/     # settings, root urls, wsgi/asgi
│   ├── portfolio/             # profile, experience, skills, projects, education, resume
│   ├── accounts/              # JWT login/refresh
│   └── contact/               # contact form + messages
└── frontend/
    ├── src/
    │   ├── components/        # Navbar, Hero, About, Experience, Skills, Projects, ProjectCard, Education, Contact, Footer, BrandIcons
    │   ├── pages/              # Home, ProjectDetails
    │   ├── services/api.js     # Axios client
    │   ├── hooks/usePortfolioData.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## Notes on Content Accuracy

- The exact official job designation at Crystal Delta was not provided, so
  it currently displays **"Software Developer"** — edit `Experience →
  designation` in Django Admin once confirmed.
- No employment dates, specific project achievements, or personally-claimed
  features were provided for SkillsMax.AI / SkillsMax Exchange, so none were
  invented — add verified details (technologies, features, role) from Django
  Admin as they become available.
- Education has no seeded records — add degree/institution/year/description
  from Django Admin.
- Social link URLs are seeded as placeholders — update them with the real
  LinkedIn/GitHub profile URLs in Django Admin.
- The profile photo (`frontend/src/assets/profile.jpg`) is used as the
  default hero/navbar image. Uploading a `Profile → profile_image` in Django
  Admin will automatically override it once the backend is running.
