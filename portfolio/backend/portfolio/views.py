from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Profile, SocialLink, Experience, SkillCategory, Project, Education, Resume,
)
from .serializers import (
    ProfileSerializer, SocialLinkSerializer, ExperienceSerializer,
    SkillCategorySerializer, ProjectListSerializer, ProjectDetailSerializer,
    EducationSerializer, ResumeSerializer,
)


class ProfileView(APIView):
    """Returns the single active profile record (creates a default one if missing)."""
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        profile, _ = Profile.objects.get_or_create(pk=1)
        return Response(ProfileSerializer(profile, context={'request': request}).data)


class SocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all().prefetch_related('skills')
    serializer_class = SkillCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().prefetch_related('technologies')
    lookup_field = 'slug'
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectDetailSerializer


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ActiveResumeView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        resume = Resume.objects.filter(is_active=True).first()
        if not resume:
            return Response({'detail': 'No resume uploaded yet.'}, status=404)
        return Response(ResumeSerializer(resume, context={'request': request}).data)
