from rest_framework import serializers
from .models import (
    Profile, SocialLink, Experience, SkillCategory, Skill,
    Project, ProjectTechnology, Education, Resume,
)


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'platform', 'url', 'order']


class ProfileSerializer(serializers.ModelSerializer):
    social_links = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'full_name', 'title_primary', 'title_secondary', 'tagline',
            'about_text', 'current_company', 'location', 'email', 'phone',
            'profile_image', 'social_links',
        ]

    def get_social_links(self, obj):
        return SocialLinkSerializer(SocialLink.objects.all(), many=True).data


class ExperienceSerializer(serializers.ModelSerializer):
    responsibilities = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'designation', 'location', 'start_date',
            'end_date', 'is_current', 'responsibilities', 'order',
        ]

    def get_responsibilities(self, obj):
        return obj.responsibilities_list()


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'is_primary_stack', 'order']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'order', 'skills']


class ProjectTechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTechnology
        fields = ['id', 'name']


class ProjectListSerializer(serializers.ModelSerializer):
    technologies = ProjectTechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'live_url',
            'github_url', 'image', 'technologies', 'is_featured', 'order',
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    technologies = ProjectTechnologySerializer(many=True, read_only=True)
    features = serializers.SerializerMethodField()
    role_responsibilities = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'full_description',
            'features', 'role_responsibilities', 'live_url', 'github_url',
            'image', 'technologies',
        ]

    def get_features(self, obj):
        return obj.features_list()

    def get_role_responsibilities(self, obj):
        return obj.responsibilities_list()


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'year', 'description', 'order']


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'file', 'uploaded_at', 'is_active']
