from django.contrib import admin
from .models import (
    Profile, SocialLink, Experience, SkillCategory, Skill,
    Project, ProjectTechnology, Education, Resume,
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'title_primary', 'current_company', 'updated_at')

    def has_add_permission(self, request):
        # Keep this a singleton-style model — only one profile record.
        return not Profile.objects.exists()


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url', 'order')
    list_editable = ('order',)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('designation', 'company', 'location', 'start_date', 'end_date', 'is_current', 'order')
    list_editable = ('order',)


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)
    inlines = [SkillInline]


class ProjectTechnologyInline(admin.TabularInline):
    model = ProjectTechnology
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_featured', 'order')
    list_editable = ('order', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectTechnologyInline]


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'year', 'order')
    list_editable = ('order',)


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('file', 'uploaded_at', 'is_active')
    list_editable = ('is_active',)
