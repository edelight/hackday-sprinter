from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from toolbox.models import Project, Goal, Story


class BaseResource(ModelResource):
    def determine_format(self, request):
        return "application/json" 


class ProjectResource(BaseResource):
    class Meta:
        queryset = Project.objects.all()
        resource_name = 'projects'
        authorization= Authorization()


class GoalResource(BaseResource):
    class Meta:
        queryset = Goal.objects.all()
        resource_name = 'goals'
        authorization= Authorization()


class StoryResource(BaseResource):
    class Meta:
        queryset = Story.objects.all()
        resource_name = 'stories'
        authorization= Authorization()
