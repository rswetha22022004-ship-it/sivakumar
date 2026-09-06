from django.db import models


class Profile(models.Model):
    """Singleton-style model holding the main hero/about information."""
    full_name = models.CharField(max_length=150, default="P. Sivakumar")
    title_primary = models.CharField(max_length=150, default="MERN Stack Developer")
    title_secondary = models.CharField(max_length=150, default="Full Stack Developer")
    tagline = models.TextField(
        default="Building modern, scalable and user-focused web applications "
                "using the MERN stack, React and modern backend technologies."
    )
    about_text = models.TextField(
        default="P. Sivakumar is a passionate MERN Stack Developer focused on "
                "developing modern web applications and scalable digital solutions. "
                "He works across frontend and backend development using MongoDB, "
                "Express.js, React.js and Node.js, with additional experience in "
                "Django, Python, SQL and REST API development."
    )
    current_company = models.CharField(max_length=150, default="Crystal Delta")
    location = models.CharField(max_length=150, default="Aruppukottai, Tamil Nadu, India")
    email = models.EmailField(default="sivap4817@gmail.com")
    phone = models.CharField(max_length=20, default="+91 8489291309")
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.full_name


class SocialLink(models.Model):
    PLATFORM_CHOICES = [
        ('linkedin', 'LinkedIn'),
        ('github', 'GitHub'),
        ('twitter', 'Twitter / X'),
        ('other', 'Other'),
    ]
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.get_platform_display()}"


class Experience(models.Model):
    company = models.CharField(max_length=150, default="Crystal Delta")
    designation = models.CharField(
        max_length=150,
        default="Software Developer",
        help_text="Official designation. Edit here once confirmed."
    )
    location = models.CharField(max_length=150, default="Aruppukottai, Tamil Nadu")
    start_date = models.CharField(max_length=50, blank=True, help_text="e.g. 2023 (leave blank if unknown)")
    end_date = models.CharField(max_length=50, blank=True, default="Present")
    is_current = models.BooleanField(default=True)
    responsibilities = models.TextField(
        help_text="One responsibility per line.",
        default=(
            "Developing modern web applications\n"
            "Building reusable React components\n"
            "Developing REST APIs\n"
            "Working with Node.js and Express.js\n"
            "MongoDB database integration\n"
            "Frontend and backend integration\n"
            "Authentication and authorization\n"
            "API testing and debugging\n"
            "Responsive UI development\n"
            "Database management"
        )
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.designation} @ {self.company}"

    def responsibilities_list(self):
        return [r.strip() for r in self.responsibilities.splitlines() if r.strip()]


class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Skill Categories"

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    is_primary_stack = models.BooleanField(
        default=False,
        help_text="Check for MERN core skills (React, Node, Express, MongoDB) to make them visually prominent."
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True)
    short_description = models.TextField()
    full_description = models.TextField(blank=True)
    role_responsibilities = models.TextField(
        blank=True,
        help_text="One item per line. Leave blank if not verified."
    )
    features = models.TextField(blank=True, help_text="One feature per line.")
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return self.title

    def features_list(self):
        return [f.strip() for f in self.features.splitlines() if f.strip()]

    def responsibilities_list(self):
        return [r.strip() for r in self.role_responsibilities.splitlines() if r.strip()]


class ProjectTechnology(models.Model):
    project = models.ForeignKey(Project, related_name='technologies', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Education(models.Model):
    degree = models.CharField(max_length=150)
    institution = models.CharField(max_length=200)
    year = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Resume(models.Model):
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"Resume ({self.uploaded_at:%Y-%m-%d})"
