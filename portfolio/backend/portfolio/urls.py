from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileView, SocialLinkViewSet, ExperienceViewSet, SkillCategoryViewSet,
    ProjectViewSet, EducationViewSet, ActiveResumeView,
)

router = DefaultRouter()
router.register('social-links', SocialLinkViewSet, basename='social-links')
router.register('experience', ExperienceViewSet, basename='experience')
router.register('skills', SkillCategoryViewSet, basename='skills')
router.register('projects', ProjectViewSet, basename='projects')
router.register('education', EducationViewSet, basename='education')

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('resume/', ActiveResumeView.as_view(), name='active-resume'),
] + router.urls
