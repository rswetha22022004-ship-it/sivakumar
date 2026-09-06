from django.core.management.base import BaseCommand
from portfolio.models import (
    Profile, SocialLink, Experience, SkillCategory, Skill, Project, Education,
)


class Command(BaseCommand):
    help = "Seed the database with P. Sivakumar's initial portfolio content."

    def handle(self, *args, **options):
        # --- Profile -------------------------------------------------
        profile, _ = Profile.objects.get_or_create(pk=1)
        profile.full_name = "P. Sivakumar"
        profile.title_primary = "MERN Stack Developer"
        profile.title_secondary = "Full Stack Developer"
        profile.tagline = (
            "Building modern, scalable and user-focused web applications "
            "using the MERN stack, React and modern backend technologies."
        )
        profile.about_text = (
            "P. Sivakumar is a passionate MERN Stack Developer focused on "
            "developing modern web applications and scalable digital solutions. "
            "He works across frontend and backend development using MongoDB, "
            "Express.js, React.js and Node.js, with additional experience in "
            "Django, Python, SQL and REST API development."
        )
        profile.current_company = "Crystal Delta"
        profile.location = "Aruppukottai, Tamil Nadu, India"
        profile.email = "sivap4817@gmail.com"
        profile.phone = "+91 8489291309"
        profile.save()
        self.stdout.write(self.style.SUCCESS("Profile seeded."))

        # --- Social links ---------------------------------------------
        SocialLink.objects.get_or_create(
            platform='linkedin',
            defaults={'url': 'https://www.linkedin.com/', 'order': 1},
        )
        SocialLink.objects.get_or_create(
            platform='github',
            defaults={'url': 'https://github.com/', 'order': 2},
        )
        self.stdout.write(self.style.WARNING(
            "Social links created with placeholder URLs — update them in Django Admin."
        ))

        # --- Experience --------------------------------------------------
        Experience.objects.get_or_create(
            company="Crystal Delta",
            designation="Software Developer",
            defaults=dict(
                location="Aruppukottai, Tamil Nadu",
                start_date="",
                end_date="Present",
                is_current=True,
                order=1,
            ),
        )
        self.stdout.write(self.style.SUCCESS("Experience seeded."))

        # --- Skills --------------------------------------------------
        skill_data = {
            "MERN Stack": [
                ("MongoDB", True), ("Express.js", True),
                ("React.js", True), ("Node.js", True),
            ],
            "Frontend": [
                ("React.js", True), ("JavaScript", False), ("HTML5", False),
                ("CSS3", False), ("Tailwind CSS", False),
                ("Responsive Web Design", False),
            ],
            "Backend": [
                ("Node.js", True), ("Express.js", True), ("Django", False),
                ("Django REST Framework", False), ("Python", False),
                ("REST APIs", False), ("Nest.js", False), ("TypeScript", False),
            ],
            "Database": [
                ("MongoDB", True), ("MySQL", False), ("SQL", False),
            ],
            "Tools": [
                ("Git", False), ("GitHub", False), ("Postman", False),
                ("VS Code", False), ("npm", False), ("Swagger", False),
            ],
            "Other": [
                ("API Integration", False), ("Authentication", False),
                ("JWT", False), ("CRUD Applications", False),
                ("Database Integration", False), ("Debugging", False),
                ("AWS", False),
            ],
        }
        for order, (cat_name, skills) in enumerate(skill_data.items(), start=1):
            category, _ = SkillCategory.objects.get_or_create(name=cat_name, defaults={'order': order})
            for s_order, (skill_name, is_primary) in enumerate(skills, start=1):
                Skill.objects.get_or_create(
                    category=category, name=skill_name,
                    defaults={'is_primary_stack': is_primary, 'order': s_order},
                )
        self.stdout.write(self.style.SUCCESS("Skills seeded."))

        # --- Projects --------------------------------------------------
        p1, _ = Project.objects.get_or_create(
            slug="skillsmax-ai",
            defaults=dict(
                title="SkillsMax.AI",
                short_description=(
                    "AI-powered assessment and interview platform designed to support "
                    "technical interviews, coding assessments, communication "
                    "assessments, aptitude and recruitment workflows."
                ),
                full_description=(
                    "SkillsMax is an AI-powered assessment and interview platform "
                    "designed to support technical interviews, coding assessments, "
                    "communication assessments, aptitude and recruitment workflows."
                ),
                live_url="https://skillsmax.ai/",
                order=1,
            ),
        )
        p2, _ = Project.objects.get_or_create(
            slug="skillsmax-exchange",
            defaults=dict(
                title="SkillsMax Exchange",
                short_description="A web application within the SkillsMax ecosystem.",
                full_description="SkillsMax Exchange is a web application within the SkillsMax ecosystem.",
                live_url="https://exchange.skillsmax.ai/",
                order=2,
            ),
        )
        self.stdout.write(self.style.SUCCESS("Projects seeded."))
        self.stdout.write(self.style.WARNING(
            "Add verified technology badges, images and role details for each "
            "project from Django Admin."
        ))

        # --- Education --------------------------------------------------
        education_data = [
            {
                "degree": "Master of Computer Applications",
                "institution": "Rathinavel Subramaniyam College of Arts and Science-Coimbatore",
                "year": "2021-2023",
                "description": "CGPA: 76%",
                "order": 1,
            },
            {
                "degree": "Bachelor of Computer Science",
                "institution": "Bharathiar University-Coimbatore",
                "year": "2018-2021",
                "description": "CGPA: 68%",
                "order": 2,
            },
        ]
        for education in education_data:
            Education.objects.update_or_create(
                degree=education["degree"],
                institution=education["institution"],
                defaults={
                    "year": education["year"],
                    "description": education["description"],
                    "order": education["order"],
                },
            )
        self.stdout.write(self.style.SUCCESS("Education seeded."))

        self.stdout.write(self.style.SUCCESS("Seeding complete."))
